exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('tweets', (table) => {
    table.increments('id').primary()
    table.string('username').unique().notNullable()
    table.string('message').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tweets')
};
