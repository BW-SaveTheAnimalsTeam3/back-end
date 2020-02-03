
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
    .createTable('campaigns', tbl => {
        tbl.increments('campaign_id');
        tbl.integer('org_id')
            .unsigned()
            .notNullable()
            .references('org_id')
            .inTable('organizations');
        tbl.string('campaign')
            .notNullable()
            .unique();
        tbl.string('location')
            .notNullable();
        tbl.text('description')
            .notNullable()
        tbl.string('species')
            .notNullable();
        tbl.string('urgency_level')
            .notNullable();
        tbl.integer('funding_goal')
            .notNullable();
        tbl.date('deadline')
            .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists();
};
