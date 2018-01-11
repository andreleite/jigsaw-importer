const knex = require('./knex-connection')

const prepareSkillToInsert = (skill) => {
  return {
    employeeId: skill.employeeId,
    name: skill.name,
    rating: skill.rating,
    groupName: skill.group.name
  }
}

const insertSkill = async (skill) => {
  return await knex('skills')
    .insert(prepareSkillToInsert(skill))
}

const insertSkills = async (skills) => {
  const promises = skills
    .filter(skill => !!skills.length)
    .map(insertSkill)
  return await Promise.all(promises)
}

module.exports = {
  prepareSkillToInsert,
  insertSkill,
  insertSkills
}
