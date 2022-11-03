const knex = require("../knex");

module.exports = {
  getReviewsForMovie(movieId) {
    return knex
      .select("review")
      .from("movie_reviews")
      .where("movie_id", "=", Number(movieId));
  },

  getReviewsForTVShow(TVId) {
    return knex
      .select("review")
      .from("tv_reviews")
      .where("tv_show_id", "=", Number(TVId));
  },

  addReviewForMovies(data) {
    return knex("movie_reviews").insert({
      movie_id: Number(data.movieID),
      review: data.review,
    });
  },

  addReviewForTVShows(data) {
    knex("tv_reviews").insert({
      tv_show_id: Number(data.tv_show_id),
      review: data.review,
    });
  },

  getUserByEmail(userEmail) {
    return knex
      .select({
        userId: "id",
        userName: "username",
        userEmail: "email",
        userPassword: "password",
      })
      .from("users")
      .where("email", "=", userEmail);
  },

  sendUserData(data) {
    const {userName, userEmail, userPassword} = data;
    return knex("users").insert({
      username: userName,
      email: userEmail,
      password: userPassword,
    });
  },
};
