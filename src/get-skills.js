const knex = require('./knex-connection')
const axios = require('axios')

const getAllIds = async () => {
  const employeeIdsFromDB = await knex.select('employeeId').from('people')
  return employeeIdsFromDB
    .reduce((accumulator, current) => accumulator = accumulator.concat(current.employeeId), [])
}

const getPersonSkills = async (id) => {
  const response = await axios({
    url: `/people/${id}/skills`,
    method: 'get',
    baseURL: process.env.JIGSAW_URL,
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })
  return {id, data: response.data}
}

const getSkillsBatch = async (ids) => {
  const promises = ids
    .map(id => getPersonSkills(id))
    return await Promise.all(promises)
}

const getIdsChunks = (ids) => {
  let i, j
  let output = []
  const CHUNK = 500
  for (i = 0, j = ids.length; i < j; i += CHUNK) {
    output.push(ids.slice(i, i + CHUNK))
  }
  return output
}

const getAllPeopleSkills = async (ids) => {
  let output = []
  let i, j
  let chunks = getIdsChunks(ids)
  for(i = 0, j = chunks.length; i < j; i++) {
    console.log('batch %s of %s', i + 1, j)
    const skills = await getSkillsBatch(chunks[i])
    output = output.concat(skills)
  }
  return output
}

module.exports = {
  getAllIds,
  getPersonSkills,
  getSkillsBatch,
  getIdsChunks,
  getAllPeopleSkills
}
