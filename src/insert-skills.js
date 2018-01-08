const knex = require('knex')({
  client: 'sqlite3',
  connection: {filename: process.env.DB}
})

const getAllIds = async () => {
  const employeeIdsFromDB = await knex.select('employeeId').from('people')

  return employeeIdsFromDB
    .reduce((accumulator, current) =>
      accumulator = accumulator.concat(current.employeeId), [])
}

module.exports = { getAllIds }
