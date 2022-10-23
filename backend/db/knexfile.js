<<<<<<< Updated upstream
require('dotenv').config({path: "./../../.env.local",});

=======
require('dotenv').config({path:__dirname+'/../../.env.local'})
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        database: process.env.DB_NAME || "sagaproject",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "Osaka"
=======
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
>>>>>>> Stashed changes
    },
    migrations: {
        directory: "./migrations"
    },
    seeds: {
        directory: "./seed"
    }
  }

};
