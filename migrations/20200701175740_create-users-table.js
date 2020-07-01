
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').unique().notNullable();
    table.integer('role_id').notNullable();

    table.foreign('role_id').references('id').inTable('roles');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
