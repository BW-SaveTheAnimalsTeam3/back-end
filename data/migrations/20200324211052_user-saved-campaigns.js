
exports.up = function(knex) {
  return knex.schema.createTable('user-saved-campaigns', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('campaigns')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user-saved-campaigns')
};
