const knex = require("./knex");

module.exports = {
  getUserByEmail(userEmail) {
    return knex
      .select({
        id: "id",
        userName: "username",
        userEmail: "email",
        userPasswoed: "password",
      })
      .from("users")
      .where({ email: userEmail });
  },

  getUserByUserName(userName) {
    return knex
      .select({
        id: "id",
        userName: "username",
        userEmail: "email",
        userPasswoed: "password",
      })
      .from("users")
      .where({ username: userName });
  },
};
