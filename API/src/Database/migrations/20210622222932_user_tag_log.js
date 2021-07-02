
exports.up = function (knex) {
  return knex.schema.createTable('user_tag_log', function (table) {
    table.increments()
    table.boolean('tagged').notNullable()
    table.string('user_id').notNullable()
    table.string('lab_id').notNullable()
    table.timestamp('tag_time', { useTz: false }).defaultTo(knex.fn.now())

    table.foreign('user_id').references('id').inTable('users')
    table.foreign('lab_id').references('id').inTable('labs')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_tag_log')
};
