const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config({ path: "../.env.local" });

const API_KEY = process.env.API_KEY_TMDB;

const imagePath = "https://image.tmdb.org/t/p/original";

//Knex functions
const {
  getReviewsForMovie,
  getReviewsForTVShow,
  addReviewForMovies,
  addReviewForMovies,
  addReviewForTVShows,
} = require("./middleware/model");

//routing for jwt
const login = 
app.use("/auth", require("./jwt/jwt.login"));
app.use("/auth", require("./jwt/jwt.users"));

// have node serve the files for our built React app
const path = require("path");
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());

const filterMovies = (movieID) => {
  let result;
  const forKids = fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/release_dates?api_key=${API_KEY}`
  )
    .then((result) => result.json())
    .then((object) => {
      object["results"].forEach((element) => {
        if (element.iso_3166_1 === "US") {
          element.release_dates.forEach((releaseDate) => {
            if (
              releaseDate["certification"] === "PG" ||
              releaseDate["certification"] === "PG-13" ||
              releaseDate["certification"] === "G"
            ) {
              result = true;
            }
          });
        }
      });
      return result;
    })
    .then((res) => {
      return res;
    });
  return forKids;
};

//Get request for popular movies
app.get("/popularMovies", async (req, res) => {
  let popularMoviesArray = [];
  const adultFilter = req.get("Filter");
  const fetchedData = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((result) => result.json())
    .then(async (data) => {
      const movies = data.results;
      if (adultFilter === "false") {
        movies.forEach((movie) => {
          let movieInfo = {};
          movieInfo.movieID = movie.id;
          movieInfo.moviePoster = imagePath + movie.poster_path;
          movieInfo.movieTitle = movie.title;
          movieInfo.movieDescription = movie.overview;
          movieInfo.movieRating = movie.vote_average;
          movieInfo.releaseDate = movie.release_date;
          popularMoviesArray.push(movieInfo);
        });
        return popularMoviesArray;
      } else if (adultFilter === "true") {
        const arrayOfPromises = [];
        movies.forEach((movie) => {
          arrayOfPromises.push(filterMovies(movie.id));
        });

        return await Promise.all(arrayOfPromises)
          .then((arrayOfBooleans) => {
            arrayOfBooleans.forEach((boolean, i) => {
              if (boolean) {
                let movieInfo = {};
                movieInfo.movieID = movies[i].id;
                movieInfo.moviePoster = imagePath + movies[i].poster_path;
                movieInfo.movieTitle = movies[i].title;
                movieInfo.movieDescription = movies[i].overview;
                movieInfo.movieRating = movies[i].vote_average;
                movieInfo.releaseDate = movies[i].release_date;
                popularMoviesArray.push(movieInfo);
              }
            });
          })
          .then(() => {
            return popularMoviesArray;
          });
      }
    })
    .then((resultArray) => res.send(resultArray));
  return fetchedData;
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
  await getReviewsForMovie(movieID).then((data) => {
    data.forEach((review) => {
      let userReview = {};
      userReview.author = "Anonymous";
      userReview.review = review.review;
      reviewsArray.unshift(userReview);
    });
  });
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((result) => result.json())
    .then((object) => {
      object["results"].forEach((TMDBreview) => {
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
  const fromYear = req.get("fromYear")
    ? "&release_date.gte=" + req.get("fromYear")
    : "";
  const untilYear = req.get("untilYear")
    ? "&release_date.lte=" + req.get("untilYear")
    : "";
  const rating = req.get("rating")
    ? "&vote_average.gte=" + req.get("rating")
    : "";
  let certification;
  const adultFilter = req.get("Filter");
  if (adultFilter === "true") {
    certification = "&certification_country=US&certification.lte=PG-13";
  } else {
    certification = req.get("certification")
      ? "&certification_country=US&certification.lte=" +
        req.get("certification")
      : "";
  }
  const sort_by = req.get("sort_by")
    ? "&sort_by=" + req.get("sort_by")
    : "&sort_by=popularity.desc";
  const castOrCrew = req.get("castOrCrew")
    ? "&with_people=" + req.get("castOrCrew")
    : "";
  const searchResultArray = [];
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US${sort_by}${certification}&include_adult=false&include_video=false&page=1${fromYear}${untilYear}${rating}${castOrCrew}${genre}&with_original_language=en`
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
          searchResultArray.push(movieInfo);
        }
      });
      return searchResultArray;
    })
    .then((resultArray) => res.send(resultArray));
});

//Get all the certifications for the US. Ex:PG or R"
app.get("/movieCertifications", (req, res) => {
  const certifications = [];
  fetch(
    `https://api.themoviedb.org/3/certification/movie/list?api_key=${API_KEY}`
  )
    .then((result) => result.json())
    .then((object) => {
      object["certifications"]["US"].forEach((element) => {
        certifications.push(element.certification);
      });
      return certifications;
    })
    .then((resultArray) => res.send(resultArray));
});

//Get a list of options to sort by when searching a movie"
app.get("/movieSortBy", (req, res) => {
  res.send([
    "popularity.asc",
    "popularity.desc",
    "release_date.asc",
    "release_date.desc",
    "revenue.asc",
    "revenue.desc",
    "primary_release_date.asc",
    "primary_release_date.desc",
    "original_title.asc",
    "original_title.desc",
    "vote_average.asc",
    "vote_average.desc",
    "vote_count.asc",
    "vote_count.desc",
  ]);
});

//Get all the genres and their ID for movies"
app.get("/movieGenres", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  )
    .then((result) => result.json())
    .then((object) => res.send(object["genres"]));
});

//Get top rated movies
app.get("/topRatedMovies", (req, res) => {
  const topRatedMoviesArray = [];
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
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
          topRatedMoviesArray.push(movieInfo);
        }
      });
      return topRatedMoviesArray;
    })
    .then((resultArray) => res.send(resultArray));
});

//Get upcoming movies
app.get("/upcomingMovies", async (req, res) => {
  const upcomingMoviesArray = [];
  const location = req.get("location") ? "&region=" + req.get("location") : "";
  const adultFilter = req.get("Filter");
  const fetchedData = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`
  )
    .then((result) => result.json())
    .then(async (data) => {
      const movies = data.results;
      if (adultFilter === "false") {
        movies.forEach((movie) => {
          let movieInfo = {};
          movieInfo.movieID = movie.id;
          movieInfo.moviePoster = imagePath + movie.poster_path;
          movieInfo.movieTitle = movie.title;
          movieInfo.movieDescription = movie.overview;
          movieInfo.movieRating = movie.vote_average;
          movieInfo.releaseDate = movie.release_date;
          upcomingMoviesArray.push(movieInfo);
        });
        return upcomingMoviesArray;
      } else if (adultFilter === "true") {
        const arrayOfPromises = [];
        movies.forEach((movie) => {
          arrayOfPromises.push(filterMovies(movie.id));
        });

        return await Promise.all(arrayOfPromises)
          .then((arrayOfBooleans) => {
            arrayOfBooleans.forEach((boolean, i) => {
              if (boolean) {
                let movieInfo = {};
                movieInfo.movieID = movies[i].id;
                movieInfo.moviePoster = imagePath + movies[i].poster_path;
                movieInfo.movieTitle = movies[i].title;
                movieInfo.movieDescription = movies[i].overview;
                movieInfo.movieRating = movies[i].vote_average;
                movieInfo.releaseDate = movies[i].release_date;
                upcomingMoviesArray.push(movieInfo);
              }
            });
          })
          .then(() => {
            return upcomingMoviesArray;
          });
      }
    })
    .then((resultArray) => res.send(resultArray));
  return fetchedData;
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

app.post("/movie/userReviewToDB", async (req, res) => {
  await addReviewForMovies(req.body).then(
    res.send("A new movie review has been added to our DB")
  );
});

app.post("/TV/userReviewToDB", async (req, res) => {
  await addReviewForTVShows(req.body).then(
    res.send("A new movie review has been added to our DB")
  );
});

//New(not complete)
app.get("/TvCredits/:TvID", (req, res) => {
  const TvID = req.params.TvID;
  const TvCredits = {};
  TvCredits.cast = [];
  TvCredits.director = [];
  TvCredits.writer = [];
  fetch(
    `https://api.themoviedb.org/3/tv/${TvID}/credits?api_key=${API_KEY}&language=en-US`
  )
    .then((result) => result.json())
    .then((object) => {
      object["cast"].forEach((element) => TvCredits.cast.push(element.name));
      object.crew.forEach((element) => {
        if (element.job === "Novel") {
          TvCredits.writer.push(element.name);
        } else if (element.job === "Executive Producer") {
          TvCredits.director.push(element.name);
        }
      });
      return TvCredits;
    })
    .then((resultCredits) => res.send(resultCredits));
});

//should connect database
app.get("/reviewsTv", async (req, res) => {
  const TvID = req.get("TvID");
  const reviewArr = [];
  await getReviewsForTVShow(TvID).then((data) => {
    data.forEach((review) => {
      let userReview = {};
      userReview.author = "Anonymous";
      userReview.review = review.review;
      reviewArr.unshift(userReview);
    });
  });
  fetch(
    `https://api.themoviedb.org/3/tv/${TvID}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((result) => result.json())
    .then((object) => {
      object["results"].forEach((element) => {
        let reviewFromTMDB = {};
        reviewFromTMDB.author = element.author;
        reviewFromTMDB.review = element.content;
        reviewArr.push(reviewFromTMDB);
      });
      return reviewArr;
    })
    .then((resultArray) => res.send(resultArray));
});

app.get("/tvGenres", (req, res) => {
  const arrGenres = [];
  fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
  )
    .then((result) => result.json())
    .then((object) => {
      object["genres"].forEach((element) => {
        arrGenres.push(element);
      });
      return arrGenres;
    })
    .then((resultArray) => res.send(resultArray));
});

app.get("/tvGenresId", (req, res) => {
  const arrGenresId = [];
  fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
  )
    .then((result) => result.json())
    .then((object) => {
      object["genres"].forEach((element) => {
        arrGenresId.push(element.id);
      });
      return arrGenresId;
    })
    .then((resultArray) => res.send(resultArray));
});

app.get("/tvGenresName", (req, res) => {
  const arrGenresName = [];
  fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
  )
    .then((result) => result.json())
    .then((object) => {
      object["genres"].forEach((element) => {
        arrGenresName.push(element.name);
      });
      return arrGenresName;
    })
    .then((resultArray) => res.send(resultArray));
});

app.get("/topRatedTv", (req, res) => {
  const topRatedTvShowArray = [];
  fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((result) => result.json())
    .then((object) => {
      object["results"].forEach((element) => {
        let tvInfo = {};
        tvInfo.id = element.id;
        tvInfo.title = element.name;
        tvInfo.poster = imagePath + element.poster_path;
        tvInfo.description = element.overview;
        tvInfo.tvRating = element.vote_average;
        tvInfo.releaseDate = element.first_air_date;
        topRatedTvShowArray.push(tvInfo);
      });
      return topRatedTvShowArray;
    })
    .then((resultArray) => res.send(resultArray));
});

//Search TV show with different parmeters
app.get("/searchTV", (req, res) => {
  const genre = req.get("genre") ? "&with_genres=" + req.get("genre") : "";
  const fromYear = req.get("fromYear")
    ? "&first_air_date.gte=" + req.get("fromYear")
    : "";
  const untilYear = req.get("untilYear")
    ? "&first_air_date.lte=" + req.get("untilYear")
    : "";
  const rating = req.get("rating")
    ? "&vote_average.gte=" + req.get("rating")
    : "";
  const sort_by = req.get("sort_by")
    ? "&sort_by=" + req.get("sort_by")
    : "&sort_by=popularity.desc";

  const searchResultArray = [];
  fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US${sort_by}${fromYear}${untilYear}&page=1${rating}${genre}&include_null_first_air_dates=false`
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
        TvInfo.releaseDate = element.first_air_date;

        searchResultArray.push(TvInfo);
      });
      return searchResultArray;
    })
    .then((resultArray) => res.send(resultArray));
});

app.get("/tvSortBy", (req, res) => {
  res.send([
    "popularity.asc",
    "popularity.desc",
    "first_air_date.asc",
    "first_air_date.desc",
    "vote_average.asc",
    "vote_average.desc",
  ]);
});

app.get("/userCountry", (req, res) => {
  fetch("http://ip-api.com/json")
    .then((result) => result.json())
    .then((object) => object.countryCode)
    .then((location) => res.send({ location }));
});

// GET requests not handled will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
