const getPeople = require('../src/get-people')
const headers = {
  'cache-control': 'must-revalidate, private, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  date: 'Fri, 05 Jan 2018 18:35:04 GMT',
  etag: '"9062dcda26211fe7a7594060e6421150"',
  link: '<https://jigsaw.thoughtworks.net/api/people?page=2>; rel="next",<https://jigsaw.thoughtworks.net/api/people?page=52>; rel="last"',
  'x-rack-cache': 'miss',
  'x-runtime': '0.214000',
  'x-total-count': '5108',
  'x-total-pages': '30',
  'x-ua-compatible': 'IE=Edge,chrome=1',
  'transfer-encoding': 'chunked',
  connection: 'Close'
}

describe('getPeople', () => {
  beforeEach(() => {
    process.env.JIGSAW_API_SECRET = 'secret'
    const config = {
      url: '/people',
      params: {page: 1},
      method: 'get',
      baseURL: process.env.JIGSAW_URL,
      headers: {'Authorization': process.env.JIGSAW_API_SECRET}
    }
    mock
      .onGet('/people')
      .reply((config) => [200, [person, person], headers])
  })

  it('getTotalPages', async () => {
    const pages = await getPeople.getTotalPages()
    expect(pages).to.equal(30)
  })

  it('getPeoplePage', async () => {
    const peoplePage = await getPeople.getPeoplePage(1)
    expect(peoplePage).to.deep.equal([person, person])
  })

  it('getAllPeople', async function () {
    const people = await getPeople.getAllPeople(2)
    expect(people).to.deep.equal([person, person, person, person])
  })
})
