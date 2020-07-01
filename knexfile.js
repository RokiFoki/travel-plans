// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'travel_plans',
      user:     'postgres',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
