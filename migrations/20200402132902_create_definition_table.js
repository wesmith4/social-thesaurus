
exports.up = function(knex) {
  return knex.schema.createTable('definitions', (table) => {
    table.increments('id').primary();
    table.integer('word_id').references('words.id');
    table.text('definition').notNullable();
    table.text('part_of_speech');
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('definitions');
};
