
exports.seed = function(knex) {
      return knex('users').insert([
        { username: 'testOrg', password: 'testOrg'},
        { username: 'testSupporter', password: 'testSupporter'}
      ]);
};
