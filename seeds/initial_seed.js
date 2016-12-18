
exports.seed = function(knex, Promise) {
  return knex('tweets').del()
    .then(function () {
      return Promise.all([
        knex('tweets').insert({username: '@ethernetsalad', message: 'This is a tweet!'})
      ]);
    });
};
