const knex = require('knex')({
  client: 'sqlite3',
  connection: {filename: process.env.DB}
})

const createTable = async () => {
  await knex.schema.dropTableIfExists('people')
  return await knex.schema.createTable('people', (tbl) => {
    tbl.increments('id').primary()
    tbl.string('loginName')
    tbl.string('preferredName')
    tbl.string('gender')
  })
}

const insertPerson = async (person) => {
  return knex('people')
    .insert({
      id: person.employeeId,
      loginName: person.loginName,
      preferredName: person.preferredName,
      gender: person.gender
    })
}

const insertPeople = async (people) => {
  const promises = people
    .map((current) => insertPerson(current))
  const results = await Promise.all(promises)
  return results
}

module.exports = {
  createTable,
  insertPerson,
  insertPeople
}
