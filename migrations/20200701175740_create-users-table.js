
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username');
    table.integer('role_id');

    table.foreign('role_id').references('id').inTable('roles');

    table.index('username');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
