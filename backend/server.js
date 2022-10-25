const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const knex = require("./knex")
const port = process.env.PORT || 8080;
//const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./.env.local"});

const API_KEY = process.env.API_KEY_TMDB

const imagePath = "https://image.tmdb.org/t/p/original"


// have node serve the files for our built React app
const path = require('path');
app.use(express.static(path.resolve(__dirname, '../frontend/build')));


app.use(express.json());


//Get request for popular movies
app.get("/popularMovies", (req,res) => {
  const popularMoviesArray = [];
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
  .then((result) => result.json())
  .then((object) => {object["results"].forEach((element) => {
    if(element.adult === false) {
      let movieInfo = {}
      movieInfo.movieID = element.id;
      movieInfo.moviePoster = imagePath + element.poster_path;
      movieInfo.movieTitle = element.original_title;
      movieInfo.movieDescription = element.overview;
      movieInfo.movierating = element.vote_average;
      popularMoviesArray.push(movieInfo)
    }})
    return popularMoviesArray;
  })
  .then((resultArray) => res.send(resultArray))
})

//Get request for cast in a movie given the movie ID
app.get("/movieCredits", (req,res) => {
  const movieID = req.get("movieID")
  const movieCredits = {}
  movieCredits.cast = []
  movieCredits.director = []
  movieCredits.writer = []
  fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`)
  .then((result) => result.json())
  .then((object) => {
    object.cast.forEach((cast) => movieCredits.cast.push(cast.name))
    object.crew.forEach((crew) => {
      if (crew.job === "Director"){
        movieCredits.director.push(crew.name)
      }
      else if(crew.job === "Writer"){
        movieCredits.writer.push(crew.name)
      }
    })
    return movieCredits
  })
  .then((resultCredits) => res.send(resultCredits))
})

//Get request to get reviews for a movie given the movie ID(still wokring on this)
app.get("/reviewsMovie/:movieID" , (req,res) => {
  const  movieID  = req.get("movieID");
  fetch(`https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    .then((result) => result.json())
    .then((object) => {res.send(object)})
})



app.get("/movieGenres", (req, res) => {
  const genresArray = [];
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((result) => result.json())
    .then((object) => { object["genres"].forEach((element) => {
        genresArray.push(element.name);
      });
      return genresArray;
    })
    .then((resultArray) => res.send(resultArray));
});

app.get("/test", (req, res) => {
  knex.select()
  .from("users")
  .where("users.fist_name", "=", "Bryan")
  .then((result) => {
    return res.send(result);
  }).catch(err => console.log(err))
});



app.get("/popularTV", (req, res) => {
  let popularTV = [];
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((result) => result.json())
    .then((object) => { object["results"].forEach((element) => {
      let TvInfo = {};
      TvInfo.TvID = element.id;
      TvInfo.TvPoster = imagePath + element.poster_path;
      TvInfo.TvTitle = element.name;
      TvInfo.TvDescription = element.overview;
      TvInfo.TvRating = element.vote_average;
      popularTV.push(TvInfo);
    })
    return popularTV;
    })
    .then((resultArray) => res.send(resultArray))
    
})
// GET requests not handled will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
