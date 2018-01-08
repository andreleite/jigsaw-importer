require('dotenv').config()
global.chai = require('chai')
global.sinon = require('sinon')
global.expect = require('chai').expect
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
global.mock = new MockAdapter(axios);
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const fixtures = require('./fixtures')
global.person = fixtures.person
global.person2 = { ...person, employeeId: person.employeeId++ }
process.env.DB = process.env.DB_TEST

const insertPeople = require('../src/insert-people')
global.populateDB = async () => {
  await insertPeople.createTable()
  await insertPeople.insertPeople([person, person2])
}
