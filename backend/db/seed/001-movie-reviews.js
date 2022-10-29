/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie_reviews').del()
  // await knex('movie_reviews').insert([
  //   {id: 1, movie_id: 436270, review: "Good movie"},
  //   {id: 2, movie_id: 436270, review: "Bad movie"},
  //   {id: 3, movie_id: 436270, review: "OK movie"}
  // ]);
};
