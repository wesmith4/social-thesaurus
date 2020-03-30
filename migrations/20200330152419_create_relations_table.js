
exports.up = function(knex) {
  return knex.schema.createTable('relations', (table) => {
    table.increments('id').primary();
    table.integer('first_word_id').notNullable().references('words.id');
    table.integer('second_word_id').notNullable().references('words.id');
    table.unique(['first_word_id', 'second_word_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('relations');
};
