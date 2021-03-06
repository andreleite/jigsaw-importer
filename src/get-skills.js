const axios = require('axios')

const getPersonSkills = async (id) => {
  const response = await axios({
    url: `/people/${id}/skills`,
    method: 'get',
    baseURL: 'https://jigsaw.thoughtworks.net/api',
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })
  return response
    .data
    .map((skill) => {
      return {...skill, employeeId: id}
    })
}

const getSkills = async (ids) => {
  const promises = ids
    .map(getPersonSkills)
  const skills = await Promise.all(promises)
  return [].concat.apply([], skills)
}

module.exports = {
  getPersonSkills,
  getSkills
}
