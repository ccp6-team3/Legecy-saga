/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("tv_reviews", function (table) {
        table.increments("id").primary(); // Set this column as the primary key
        table
        .integer("tv_show_id", 32)
        .notNullable()
        .index(); // Adding an index makes searching by tv_show_id faster
      table.string("review", 4000);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("tv_reviews");
};
