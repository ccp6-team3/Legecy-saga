/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'a@gmail.com', fist_name: "Alfred", last_name: "Andy"},
    {id: 2, email: 'b@gamil.com', fist_name: "Bryan", last_name: "Beau"},
    {id: 3, email: 'c@gamil.com', fist_name: "Cameron", last_name: "Chiuaua"},
  ]);
};
