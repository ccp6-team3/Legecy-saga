/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.dropTable("users");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .createTable("users", function (table) {
       table.increments("id").primary();
       table
         .string("email", 32)
         .unique()
         .notNullable()
         .index();
       table.string("fist_name", 32);
       table.string("last_name", 32); 
    });
};
