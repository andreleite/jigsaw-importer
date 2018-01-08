require('dotenv').config()
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const sinonChai = require('sinon-chai')
global.chai = require('chai')
global.sinon = require('sinon')
global.expect = require('chai').expect
const { person, personSkills, peopleHeaders } = require('./fixtures')
global.person = person
global.person2 = { ...person, employeeId: person.employeeId++ }, 
global.personSkills = personSkills 
global.peopleHeaders = peopleHeaders
global.mock = new MockAdapter(axios);
chai.use(sinonChai)
process.env.DB = process.env.DB_TEST

const insertPeople = require('../src/insert-people')
const insertSkills = require('../src/insert-skills')
global.populateDB = async () => {
  await insertPeople.createTable()
  await insertSkills.createTable()
  await insertPeople.insertPeople([person, person2])
}
