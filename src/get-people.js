const axios = require('axios')

const getTotalPages = async () => {
  const people = await axios({
    url: '/people',
    params: {page: 1},
    method: 'get',
    baseURL: 'https://jigsaw.thoughtworks.net/api',
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })
  return parseInt(people.headers['x-total-pages'], 10)
}

const getPeoplePage = async (page) => {
  const people = await axios({
    url: '/people',
    params: {page},
    method: 'get',
    baseURL: 'https://jigsaw.thoughtworks.net/api',
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })
  return people.data
}

const getPeople = async (pages) => {
  const promises = pages
    .map((page) => getPeoplePage(page))
  const results = await Promise.all(promises)
  return results
    .reduce((accumulator, current) => accumulator.concat(current), [])
}

module.exports = {
  getTotalPages,
  getPeoplePage,
  getPeople
}
