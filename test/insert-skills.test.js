const insertSkills = require('../src/insert-skills')
const insertPeople = require('../src/insert-people')

describe('insertSkills', () => {
  before(async () => {
    await populateDB()
  })

  it('get all people ids', async () => {
    const ids = await insertSkills.getAllIds()

    expect(ids).to.have.all.members(['666', '667'])
  })
})

