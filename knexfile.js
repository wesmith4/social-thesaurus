module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/thesaurus_development',
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      tableName: 'knex_seeds',
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/thesaurus_test',
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      tableName: 'knex_seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      tableName: 'knex_seeds'
    },
    pool: {
      min: 2,
      max: 10,
    }
  },
};
