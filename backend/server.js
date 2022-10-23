const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const knex = require("./knex")
const port = process.env.PORT || 8080;
//const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./.env.local"});

const API_KEY = process.env.API_KEY_TMDB


// have node serve the files for our built React app
const path = require('path');
app.use(express.static(path.resolve(__dirname, '../frontend/build')));


app.use(express.json());

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

app.get("/reviewsMovie/:movieID" , (req,res) => {
  const  movieID  = req.get("movieID");
  fetch(`https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    .then((result) => result.json())
    .then((object) => {res.send(object)})
})

// GET requests not handled will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
