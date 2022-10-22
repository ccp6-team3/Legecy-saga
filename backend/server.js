const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const knex = require("./knex")
const port = process.env.PORT || 8080;
require("dotenv").config({path: "./.env.local"});

app.use(express.json());

app.get("/movieGenres", (req, res) => {
  const genresArray = [];
  const API_KEY = process.env.API_KEY_TMDB
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
  .then((result) => {
    return res.send(result);
  }).catch(err => console.log(err))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
