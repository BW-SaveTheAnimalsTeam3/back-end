
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
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    })
    .createTable('campaigns', tbl => {
        tbl.increments('campaign_id');
        tbl.integer('org_id')
            .unsigned()
            .notNullable()
            .references('org_id')
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
        tbl.date('deadline')
            .notNullable();
    })
    .createTable('photos', tbl => {
        tbl.increments('photo_id');
        tbl.string('photo_name')
            .unique();
        tbl.string('url')
            .notNullable()
            .unique();
        tbl.integer('campaign_id')
            .unsigned()
            .notNullable()
            .references('campaign_id')
            .inTable('campaigns')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    })
    .createTable('donations', tbl => {
        tbl.increments('donation_id');
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl.integer('campaign_id')
            .unsigned()
            .notNullable()
            .references('campaign_id')
            .inTable('campaigns')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl.integer('donation_amount')
            .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('donations')
            .dropTableIfExists('photos')
            .dropTableIfExists('campaigns')
            .dropTableIfExists('organizations')
            .dropTableIfExists('users');
};