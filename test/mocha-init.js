require('dotenv').config()
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
global.mock = new MockAdapter(axios);
global.chai = require('chai')
global.sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
global.expect = require('chai').expect
const {
  person,
  personSkillsFromJigsaw,
  personSkillsProcessed,
  peopleHeaders
} = require('./fixtures')
global.person = person
global.person2 = { ...person, employeeId: person.employeeId++ }, 
global.personSkillsFromJigsaw = personSkillsFromJigsaw
global.personSkillsProcessed = personSkillsProcessed
global.peopleHeaders = peopleHeaders
