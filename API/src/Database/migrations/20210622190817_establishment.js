
exports.up = function (knex) {
  return knex.schema.createTable('establishments', function (table) {
    table.increments()
    table.string('name').notNullable()
    table.string('cnpj').notNullable().unique()
    table.string('adress').notNullable()
    table.string('password').notNullable()
    table.boolean('risk').defaultTo(false)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('establishments')
};
