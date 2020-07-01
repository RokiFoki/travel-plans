
exports.up = function(knex) {
  return knex.schema.createTable('trips', (table) => {
    table.increments();
    table.integer('user_id');
    table.timestamp('startDate', {useTz: true});
    table.timestamp('endDate', {useTz: true});
    table.text('comment')
    table.json('destination');

    table.index('user_id');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('trips');
};
