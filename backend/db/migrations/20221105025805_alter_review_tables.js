/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.table("movie_reviews", table => {
    table.string("user_name")
  })

  await knex.schema.table("tv_reviews", table => {
    table.string("user_name")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) =>{
  await knex.schema.table("movie_reviews", table => {
    table.dropColumn("user_name")
  })

  await knex.schema.table("tv_reviews", table => {
    table.dropColumn("user_name")
  })
};
