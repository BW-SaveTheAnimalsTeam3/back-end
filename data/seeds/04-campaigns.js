
exports.seed = function(knex) {
      return knex('campaigns').insert([
        {org_id: 1, campaign: 'Save the Koalas', location: 'Australia', description: 'Help the koalas impacted by the recent Australian bushfires.', species: 'Koala', urgency_level: '5', funding_goal: 500000, deadline: "2020-02-25"}
      ]);
};
