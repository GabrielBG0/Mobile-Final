
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable().unique()
    table.string('adress').notNullable()
    table.boolean('infected').defaultTo(false)
  })

};

exports.down = function (knex) {
  return knex.schema.dropTable('users')
};
