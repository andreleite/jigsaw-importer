const knex = require('./knex-connection')

const insertPeopleSkills = async (skills) => {
  skills.forEach(async (skill) => {
    await knex('skills')
    .insert({
      employeeId: id,
      name: skill.name,
      rating: skill.rating,
      groupName: skill.group.name
    })
  })
}

module.exports = {
  insertPeopleSkills
}
