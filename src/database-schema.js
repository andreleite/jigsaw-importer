const knex = require('./knex-connection')

const truncatePeople = async () => {
  await knex('people').truncate()
}

const truncateSkills = async () => {
  await knex('skills').truncate()
}

module.exports = {
  truncatePeople,
  truncateSkills
}
