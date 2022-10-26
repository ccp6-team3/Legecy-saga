/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("movie_reviews", function (table) {
        table.increments("id").primary(); // Set this column as the primary key
        table
        .integer("movie_id", 32)
        .unique() // This is a constraint that prevents duplicate emails in the table
        .notNullable()
        .index(); // Adding an index makes searching by movie_id faster
      table.string("review", 4000);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable("movie_reviews");
};
