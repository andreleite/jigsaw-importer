exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('skills', (tbl) => {
      tbl.string('employeeId')
      tbl.string('name')
      tbl.string('rating')
      tbl.string('groupName')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('skills')
  ])
}
