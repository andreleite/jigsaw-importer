const getPeople = require('../src/get-people')
const getProject = require('../src/get-project')
const sinon = require('sinon')

const TWENTY_PEOPLE = [
  person, person, person, person, person,
  person, person, person, person, person,
  person, person, person, person, person,
  person, person, person, person, person
]

const TWENTY_EXPECTED_PEOPLE = [
  expectedPerson, expectedPerson, expectedPerson, expectedPerson,
  expectedPerson, expectedPerson, expectedPerson, expectedPerson,
  expectedPerson, expectedPerson, expectedPerson, expectedPerson,
  expectedPerson, expectedPerson, expectedPerson, expectedPerson,
  expectedPerson, expectedPerson, expectedPerson, expectedPerson
]

const FORTY_EXPECTED_PEOPLE = TWENTY_EXPECTED_PEOPLE
  .concat(TWENTY_EXPECTED_PEOPLE)

describe('getPeople', () => {
  before(() => {
    sinon
      .stub(getProject, 'getPersonProject')
      .returns(Promise.resolve({employeeId: "666", project: "On The Beach"}))
  })
  after(() => {
    getProject.getPersonProject.restore()
  })
  beforeEach(() => {
    process.env.JIGSAW_API_SECRET = 'secret'
    const config = {
      url: '/people',
      params: {page: 1},
      method: 'get',
      baseURL: process.env.JIGSAW_URL,
      peopleHeaders: {'Authorization': process.env.JIGSAW_API_SECRET}
    }

    person.employeeId = "666"
    mock
      .onGet('/people')
      .reply(() => [200, TWENTY_PEOPLE, peopleHeaders])
  })

  it('getTotalPages', async () => {
    const pages = await getPeople.getTotalPages()
    expect(pages).to.equal(30)
  })

  it('getPeoplePage', async () => {
    const peoplePage = await getPeople.getPeoplePage(1)
    expect(peoplePage).to.deep.equal(TWENTY_EXPECTED_PEOPLE)
  })

  it('getPeople', async function () {
    const people = await getPeople.getPeople([1, 2])
    expect(people).to.deep.equal(FORTY_EXPECTED_PEOPLE)
  })
})
