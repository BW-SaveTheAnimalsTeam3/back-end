
exports.up = function(knex) {
  return knex.schema.creatTable('users', tbl => {
        tbl.increments('user_id');
        tbl.string('username')
            .notNullable()
            .unique();
        tbl.string('password')
            .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists();
};
