const insertPeople = require('../src/insert-people')

describe('insertPeople', () => {
  it('prepares person to insert')

  it('insert one person', async () => {
    await insertPeople.createTable()
    const response = await insertPeople.insertPerson(person)
    expect(response).to.exist
  })

  it('insert all people', async () => {
    await populateDB()
    const response = await insertPeople.insertPeople([person, person2])
    expect(response).to.exist
  })
})
