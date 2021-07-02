
exports.up = function (knex) {
    return knex.schema.createTable('est_tag_log', function (table) {
        table.increments()
        table.boolean('tagged').notNullable()
        table.integer('establishment_id').notNullable()
        table.string('lab_id').notNullable()
        table.timestamp('tag_time', { useTz: false }).defaultTo(knex.fn.now())

        table.foreign('establishment_id').references('id').inTable('establishments')
        table.foreign('lab_id').references('id').inTable('labs')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('est_tag_log')
};
