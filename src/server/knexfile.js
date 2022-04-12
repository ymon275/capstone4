module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432, 
      user: "postgres",
      password: "admin",
      database: "CCC",
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds/production",
    },
  },
};
