
exports.seed = function(knex) {
      return knex('organizations').insert([
        {org_name: 'TestOrg', user_id: 1}
      ]);
};
