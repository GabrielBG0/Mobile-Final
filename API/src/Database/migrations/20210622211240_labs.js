
exports.up = function (knex) {
  return knex.schema.createTable('labs', function (table) {
    table.increments()
    table.string('cnpj').notNullable().unique()
    table.string('password').notNullable()
    table.string('adress').notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('labs')
};
