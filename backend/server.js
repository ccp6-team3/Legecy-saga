const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const knex = require("./knex");
const port = process.env.PORT || 8080;
//const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./.env.local" });

const API_KEY = process.env.API_KEY_TMDB;

const imagePath = "https://image.tmdb.org/t/p/original";

// have node serve the files for our built React app
const path = require("path");
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());

//Get request for popular movies
app.get("/popularMovies", (req, res) => {
  const popularMoviesArray = [];
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((result) => result.json())
    .then((object) => {
      object["results"].forEach((element) => {
        if (element.adult === false) {
          let movieInfo = {};
          movieInfo.movieID = element.id;
          movieInfo.moviePoster = imagePath + element.poster_path;
          movieInfo.movieTitle = element.title;
          movieInfo.movieDescription = element.overview;
          movieInfo.movieRating = element.vote_average;
          movieInfo.releaseDate = element.release_date;
          popularMoviesArray.push(movieInfo);
        }
      });
      return popularMoviesArray;
    })
    .then((resultArray) => res.send(resultArray));
});

//Get request for cast in a movie given the movie ID
app.get("/movieCredits", (req, res) => {
  const movieID = req.get("movieID");
  const movieCredits = {};
  movieCredits.cast = [];
  movieCredits.director = [];
  movieCredits.writer = [];
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
  )
    .then((result) => result.json())
    .then((object) => {
      object.cast.forEach((cast) => movieCredits.cast.push(cast.name));
      object.crew.forEach((crew) => {
        if (crew.job === "Director") {
          movieCredits.director.push(crew.name);
        } else if (crew.job === "Writer") {
          movieCredits.writer.push(crew.name);
        }
      });
      return movieCredits;
    })
    .then((resultCredits) => res.send(resultCredits));
});

//Get request to get reviews for a movie given the movie ID
app.get("/reviewsMovie", async (req, res) => {
  const movieID = req.get("movieID");
  const reviewsArray = [];
  const UsersReviews = await knex
    .select("review")
    .from("movie_reviews")
    .where("movie_id", "=", movieID);
  await UsersReviews.forEach((review) => {
    let userReview = {};
    userReview.author = "Anonymous";
    userReview.review = review.review;
    reviewsArray.push(userReview);
  });
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((result) => result.json())
    .then((object) => {
      object.results.forEach((TMDBreview) => {
        let userReview = {};
        userReview.author = TMDBreview.author;
        userReview.review = TMDBreview.content;
        reviewsArray.push(userReview);
      });
      return reviewsArray;
    })
    .then((FinalArray) => res.send(FinalArray));
});

//Search movies with different parameters
app.get("/searchMovies", (req, res) => {
  const genre = req.get("genre") ? "&with_genres=" + req.get("genre") : "";
  const fromYear = req.get("fromYear") ? "&release_date.gte=" + req.get("fromYear") : "";
  const untilYear = req.get("untilYear") ? "&release_date.lte=" + req.get("untilYear") : "";
  const rating = req.get("rating") ? "&vote_average.gte=" + req.get("rating") : "";
  const certification = req.get("certification") ? "&certification_country=US&certification.lte=" + req.get("certification") : "";
  const sort_by = req.get("sort_by") ? "&sort_by=" + req.get("sort_by") : "&sort_by=popularity.desc";
  const castOrCrew = req.get("castOrCrew") ? "&with_people=" + req.get("castOrCrew") : "";
  const searchResultArray = []
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US${sort_by}${certification}&include_adult=false&include_video=false&page=1${fromYear}${untilYear}${rating}${castOrCrew}${genre}&with_original_language=en`)
  .then((result) => result.json())
    .then((object) => {
      object["results"].forEach((element) => {
        if (element.adult === false) {
          let movieInfo = {};
          movieInfo.movieID = element.id;
          movieInfo.moviePoster = imagePath + element.poster_path;
          movieInfo.movieTitle = element.title;
          movieInfo.movieDescription = element.overview;
          movieInfo.movieRating = element.vote_average;
          movieInfo.releaseDate = element.release_date;
          searchResultArray.push(movieInfo);
        }
      });
      return searchResultArray;
    })
    .then((resultArray) => res.send(resultArray));

});

//Get all the certifications for the US. Ex:PG or R"
app.get("/movieCertifications", (req,res) => {
  const certifications = []
  fetch(`https://api.themoviedb.org/3/certification/movie/list?api_key=${API_KEY}`)
    .then((result) => result.json())
    .then((object) => {
      object["certifications"]["US"].forEach((element) => {
        certifications.push(element.certification);
      });
      return certifications;
    })
    .then((resultArray) => res.send(resultArray));
})

//Get a list of options to sort by when searching a movie"
app.get("/movieSortBy", (req,res) => {
  res.send(["popularity.asc", "popularity.desc", "release_date.asc", "release_date.desc", "revenue.asc", "revenue.desc", "primary_release_date.asc",
    "primary_release_date.desc", "original_title.asc", "original_title.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"])
})

//Get all the genres and their ID for movies"
app.get("/movieGenres", (req, res) => {
  //const genresArray = [];
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((result) => result.json())
    .then((object) =>  res.send(object["genres"]))
    //   object["genres"].forEach((element) => {
    //     genresArray.push({genreelement.name});
    //   });
    //   return genresArray;
    // })
    // .then((resultArray) => res.send(resultArray));
});

//Get top rated movies
app.get("/topRatedMovies", (req,res) => {
  const topRatedMoviesArray = []
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
  .then((result) => result.json())
  .then((object) => {
    object["results"].forEach((element) => {
      if (element.adult === false) {
        let movieInfo = {};
        movieInfo.movieID = element.id;
        movieInfo.moviePoster = imagePath + element.poster_path;
        movieInfo.movieTitle = element.title;
        movieInfo.movieDescription = element.overview;
        movieInfo.movieRating = element.vote_average;
        movieInfo.releaseDate = element.release_date;
        topRatedMoviesArray.push(movieInfo);
      }
    });
    return topRatedMoviesArray;
  })
  .then((resultArray) => res.send(resultArray));
})

//Get upcoming movies
app.get("/upcomingMovies", (req,res) => {
  const upcomingMoviesArray = []
  const region = req.get("region") ? "&region=" + req.get("region") : "";  
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1${region}`)
  .then((result) => result.json())
  .then((object) => {
    object["results"].forEach((element) => {
      if (element.adult === false) {
        let movieInfo = {};
        movieInfo.movieID = element.id;
        movieInfo.moviePoster = imagePath + element.poster_path;
        movieInfo.movieTitle = element.title;
        movieInfo.movieDescription = element.overview;
        movieInfo.movieRating = element.vote_average;
        movieInfo.releaseDate = element.release_date;
        upcomingMoviesArray.push(movieInfo);
      }
    });
    return upcomingMoviesArray;
  })
  .then((resultArray) => res.send(resultArray));
})

app.get("/test", (req, res) => {
  knex
    .select()
    .from("users")
    .where("users.fist_name", "=", "Bryan")
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/popularTV", (req, res) => {
  let popularTV = [];
  fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((result) => result.json())
    .then((object) => {
      object["results"].forEach((element) => {
        let TvInfo = {};
        TvInfo.TvID = element.id;
        TvInfo.TvPoster = imagePath + element.poster_path;
        TvInfo.TvTitle = element.name;
        TvInfo.TvDescription = element.overview;
        TvInfo.TvRating = element.vote_average;
        popularTV.push(TvInfo);
      });
      return popularTV;
    })
    .then((resultArray) => res.send(resultArray));
});


//New(not complete)
app.get("/TvCredits/:TvId", (req, res) => {
  const TvId = req.params.TvId;
  const TvCredits = {};
  TvCredits.cast = [];
  TvCredits.director = [];
  TvCredits.writer = [];
  fetch(`https://api.themoviedb.org/3/tv/${TvId}/credits?api_key=${API_KEY}&language=en-US`)
    .then((result) => result.json())
    .then((object) => { 
      object["cast"].forEach((element) => TvCredits.cast.push(element.name))
      object.crew.forEach((element) => {
        if (element.job === "Novel") {
          TvCredits.writer.push(element.name);
        }
        else if (element.job === "Executive Producer") {
          TvCredits.director.push(element.name);
        }
      })
      return TvCredits;
    })
    .then((resultCredits) => res.send(resultCredits));
})

//New
app.get("/reviewsTv/:TvId", (req, res) => {
  const TvId = req.params.TvId;
  const reviewArr = [];
  fetch(`https://api.themoviedb.org/3/tv/${TvId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    .then((result) => result.json())
    .then((object) => { object["results"]
      .forEach((element) => {
        reviewArr.push(element.content);
      });
      return reviewArr;
    })
    .then((resultArray) => res.send(resultArray));
})

//New
app.get("/tvGenres", (req, res) => {
  const arrGenres = [];
  fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`)
    .then((result) => result.json())
    .then((object) => { object["genres"]
      .forEach((element) => {
      arrGenres.push(element);
      });
      return arrGenres;
    })
    .then((resultArray) => res.send(resultArray));
})

//New
app.get("/tvGenresId", (req, res) => {
  const arrGenresId = [];
  fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`)
    .then((result) => result.json())
    .then((object) => { object["genres"]
      .forEach((element) => {
        arrGenresId.push(element.id);
      });
      return arrGenresId;
    })
    .then((resultArray) => res.send(resultArray));
})

//New
app.get("/tvGenresName", (req, res) => {
  const arrGenresName = [];
  fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`)
    .then((result) => result.json())
    .then((object) => { object["genres"]
      .forEach((element) => {
        arrGenresName.push(element.name);
      });
      return arrGenresName;
    })
    .then((resultArray) => res.send(resultArray));
})
// GET requests not handled will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
