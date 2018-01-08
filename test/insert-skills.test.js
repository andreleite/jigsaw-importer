const insertSkills = require('../src/insert-skills')
const insertPeople = require('../src/insert-people')

describe('insertSkills', () => {
  before(async () => {
    await populateDB()
  })

  it('gets all people ids', async () => {
    const ids = await insertSkills.getAllIds()
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

    const response = await insertSkills.getPersonSkills('666')
    expect(response).to.have.all.members(personSkills)
  })

	it.only('inserts skills to database', async () => {
    mock
      .onGet('/people/666/skills')
      .reply(() => [200, personSkills])
    mock
      .onGet('/people/667/skills')
      .reply(() => [200, personSkills])
    const response = await insertSkills.insertPeopleSkills([666, 667])
    expect(response).to.exist
	})

  it('create skills table', async () => {
    const response = await insertSkills.createTable()
    expect(response).to.exist
  })
})

