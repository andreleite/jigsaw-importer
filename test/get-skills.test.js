const getSkills = require('../src/get-skills')

describe('getSkills', () => {
  before(() => {
    const config = {
      method: 'get',
      baseURL: process.env.JIGSAW_URL,
      headers: {'Authorization': process.env.JIGSAW_API_SECRET}
    }
    mock
      .onGet('/people/666/skills')
      .reply((config) => [200, personSkillsFromJigsaw])
  })

  it('gets all people\'s ids')

  it('gets person skills', async () => {
    const response = await getSkills.getPersonSkills('666')
    expect(response).to.deep.equal(personSkillsProcessed)
  })

  it('gets a batch of people skills', async () => {
    const response = await getSkills.getSkills([666])
    expect(true).to.exist
  })
})
