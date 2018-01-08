const axios = require('axios')

const getTotalPages = async () => {
  const people = await axios({
    url: '/people',
    params: {page: 1},
    method: 'get',
    baseURL: process.env.JIGSAW_URL,
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })
  return parseInt(people.headers['x-total-pages'], 10)
}

const getPeoplePage = async (page) => {
  const people = await axios({
    url: '/people',
    params: {page},
    method: 'get',
    baseURL: process.env.JIGSAW_URL,
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })
  return people.data
}

const getAllPeople = async (totalPages) => {
  const promises = Array(totalPages)
    .fill()
    .map((current, index) => getPeoplePage(++index))
  const results = await Promise.all(promises)
  return results
    .reduce((accumulator, current) => accumulator.concat(current), [])
}

module.exports = {
  getTotalPages,
  getPeoplePage,
  getAllPeople
}
