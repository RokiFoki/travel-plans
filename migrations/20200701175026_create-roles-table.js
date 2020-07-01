
exports.up = function(knex) {
  return knex.schema.createTable('roles', (table) => {
    table.increments();
    table.string('name').notNullable();
  }).then(() => {
    return knex('roles').insert([
      {name: 'Regular'},
      {name: 'User Manager'},
      {name: 'Administrator'},
    ]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
