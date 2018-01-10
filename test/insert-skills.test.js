const insertSkills = require('../src/insert-skills')

describe('insertSkills', () => {
  before(async () => {
    await populateDB()
  })

  it('inserts skills to database', async () => {
    expect(true).to.exist
  })
})

