
exports.up = function (knex) {
  return knex.schema.createTable('log', function (table) {
    table.increments()
    table.integer('establishment_id').notNullable()
    table.integer('user_id').notNullable()
    table.timestamp('check_in_time', { useTz: false }).defaultTo(knex.fn.now())
    table.timestamp('check_out_time', { useTz: false }).defaultTo(null)

    table.foreign('establishment_id').references('id').inTable('establishments')
    table.foreign('user_id').references('id').inTable('users')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('log')
};
