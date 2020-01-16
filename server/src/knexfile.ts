export default {
  development: {
    client: 'postgresql',
    connection: {
      database: 'todo',
      user: 'postgres',
      password: 'example',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
