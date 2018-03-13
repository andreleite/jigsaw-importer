const getProject = require('../src/get-project')
const sinon = require('sinon')

describe('getProject', () => {
  before(() => {
    const config = {
      method: 'get',
      baseURL: process.env.JIGSAW_URL,
      headers: { 'Authorization': process.env.JIGSAW_API_SECRET }
    }
  })

  it('gets person project', async () => {
    mock
      .onGet('/people/666/work_experiences')
      .reply((config) => [200, personProjectFromJigsaw])
    clock = sinon.useFakeTimers(new Date(2018, 0, 1))

    const response = await getProject.getPersonProject('666')
    expect(response).to.deep.equal(personProjectProcessed)
    clock.restore()
  })

  it('gets person on the beach', async () => {
    mock
      .onGet('/people/667/work_experiences')
      .reply((config) => [200, personOnTheBeachFromJigsaw])
    clock = sinon.useFakeTimers(new Date(2018, 0, 1))

    const response = await getProject.getPersonProject('667')
    expect(response).to.deep.equal(personOnTheBeach)
    clock.restore()
  })

  it('gets person project even if work experience list is unordered', async () => {
    mock
      .onGet('/people/666/work_experiences')
      .reply((config) => [200, unorderedPersonProjectFromJigsaw])
    clock = sinon.useFakeTimers(new Date(2018, 0, 1))

    const response = await getProject.getPersonProject('666')
    expect(response).to.deep.equal(personProjectProcessed)
    clock.restore()
  })
})
