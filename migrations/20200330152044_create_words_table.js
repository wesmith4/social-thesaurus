
exports.up = function(knex) {
  return knex.schema.createTable('words', (table) => {
    table.increments('id').primary();
    table.text('word').notNullable();
    table.unique(['word']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('words');
};
