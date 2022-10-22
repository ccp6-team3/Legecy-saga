require('dotenv').config({path: "./../../.env.local",});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
        directory: "./seed"
      }
  },

  development: {
    client: 'pg',
    connection: {
        database: process.env.DB_NAME || "sagaproject",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "Osaka"
    },
    migrations: {
        directory: "./migrations"
    },
    seeds: {
        directory: "./seed"
    }
  }

};
