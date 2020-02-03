
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
        tbl.increments('user_id');
        tbl.string('username')
            .notNullable()
            .unique();
        tbl.string('password')
            .notNullable()
    })
    .createTable('organizations', tbl => {
        tbl.increments('org_id');
        tbl.string('org_name')
            .notNullable()
            .unique();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists();
};
