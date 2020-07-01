
exports.up = function(knex) {
  return knex.schema.createTable('trips', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.timestamp('startDate', {useTz: true}).notNullable();
    table.timestamp('endDate', {useTz: true}).notNullable();
    table.text('comment')
    table.json('destination').notNullable();

    table.index('user_id');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('trips');
};
