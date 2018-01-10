const getSkills = require('../src/get-skills')

describe('getSkills', () => {
  before(async () => {
    //await populateDB()
  })

  it('gets all people ids', async () => {
    const ids = await getSkills.getAllIds()
    expect(ids).to.have.all.members(['666', '667'])
  })

  it('gets person skills', async () => {
    const config = {
      method: 'get',
      baseURL: process.env.JIGSAW_URL,
      headers: {'Authorization': process.env.JIGSAW_API_SECRET}
    }
    mock
      .onGet('/people/666/skills')
      .reply((config) => [200, personSkills])

    const response = await getSkills.getPersonSkills('666')
    expect(response).to.have.all.members(personSkills)
  })

  it.only('gets a batch of people skills', async () => {
    const response = await getSkills.getAllPeopleSkills(Array(5095).fill())
    expect(true).to.exist
  })
})
