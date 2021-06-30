
exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();

    table.string('titulo').notNullable();
    table.string('descricao').notNullable();
    table.decimal('valor').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

return exports.down = function (knex) {
  knex.schema.dropTable('incidents');
};
