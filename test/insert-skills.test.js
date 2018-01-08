const insertSkills = require('../src/insert-skills')
const insertPeople = require('../src/insert-people')

describe('insertSkills', () => {
  before(async () => {
    const person2 = JSON.parse(JSON.stringify(person))
    person2.employeeId++
    await insertPeople.createTable()
    const response = await insertPeople.insertPeople([person, person2])
  })

  it('get all people ids', async () => {
    const ids = await insertSkills.getAllIds()

    expect(ids).to.deep.equal(['666', '667'])
  })
})

