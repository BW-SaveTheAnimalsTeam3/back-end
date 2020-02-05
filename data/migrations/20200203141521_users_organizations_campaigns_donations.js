
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username')
            .notNullable()
            .unique();
        tbl.string('password')
            .notNullable()
    })
    .createTable('organizations', tbl => {
        tbl.increments();
        tbl.string('org_name')
            .notNullable()
            .unique();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    })
    .createTable('campaigns', tbl => {
        tbl.increments();
        tbl.integer('org_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('organizations')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
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
        tbl.string('deadline')
            .notNullable();
        tbl.string('image');
    })
    .createTable('donations', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl.integer('campaign_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('campaigns')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl.integer('donation_amount')
            .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('donations')
            .dropTableIfExists('campaigns')
            .dropTableIfExists('organizations')
            .dropTableIfExists('users');
};
