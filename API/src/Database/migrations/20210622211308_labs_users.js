
exports.up = function (knex) {
  return knex.schema.createTable('lab_user', function (table) {
    table.increments()
    table.string('user_id').notNullable()
    table.string('lab_id').notNullable()

    table.foreign('user_id').references('id').inTable('users')
    table.foreign('lab_id').references('id').inTable('labs')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('lab_user')
};
