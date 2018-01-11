const getPeople = require('../src/get-people')

describe('getPeople', () => {
  beforeEach(() => {
    process.env.JIGSAW_API_SECRET = 'secret'
    const config = {
      url: '/people',
      params: {page: 1},
      method: 'get',
      baseURL: process.env.JIGSAW_URL,
      peopleHeaders: {'Authorization': process.env.JIGSAW_API_SECRET}
    }
    mock
      .onGet('/people')
      .reply(() => [200, [person, person], peopleHeaders])
  })

  it('getTotalPages', async () => {
    const pages = await getPeople.getTotalPages()
    expect(pages).to.equal(30)
  })

  it('getPeoplePage', async () => {
    const peoplePage = await getPeople.getPeoplePage(1)
    expect(peoplePage).to.deep.equal([person, person])
  })

  it('getPeople', async function () {
    const people = await getPeople.getPeople([1, 2])
    expect(people).to.deep.equal([person, person, person, person])
  })
})
