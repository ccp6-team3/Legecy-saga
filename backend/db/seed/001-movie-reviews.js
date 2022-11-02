const { unsubscribe } = require("../../server");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("movie_reviews").del();
  await knex("users").del();

  await knex("movie_reviews").insert([
    { movie_id: 436270, review: "Good movie" },
    { movie_id: 436270, review: "Bad movie" },
    { movie_id: 436270, review: "OK movie" },
  ]);
  await knex("users").insert([
    {
      username: "testUser",
      email: "ABC@test.com",
      first_name: "Riku",
      last_name: "Usui",
      password: "ThisisTestPassWord0123456789",
    },
  ]);
};
