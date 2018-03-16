const axios = require('axios')
const getProject = require('./get-project')

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

  return await fetchProjectsSequentially(people.data) 
}

const fetchProjectsSequentially = (people) => {
  peoplePages = createPaginatedArray(people, 10)
  promise = Promise.resolve([])
  peoplePages.forEach((page) => {
    promise = promise.then((people) => {
      return fetchProjects(page).then((updatedPage) => people.concat(updatedPage))
    })
  })
  return promise
}

const createPaginatedArray = (array, pageSize) => {
    var pages = [], i;
    for (i = 0; i < array.length; i += pageSize) {
        pages.push(array.slice(i, i + pageSize));
    }
    return pages;
}

const fetchProjects = (people) => {
  return Promise.all(people.map((person) => {
    return getProject.getPersonProject(person.employeeId).then((response) => {
      person.project = response.project
      return person
    })
  }))
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
