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
  expectedPerson,
  personSkillsFromJigsaw,
  personSkillsProcessed,
  peopleHeaders,
  personProjectFromJigsaw,
  unorderedPersonProjectFromJigsaw,
  personOnTheBeachFromJigsaw,
  personProjectProcessed,
  personOnTheBeach
} = require('./fixtures')
global.person = person
global.expectedPerson = expectedPerson
global.person2 = { ...person, employeeId: person.employeeId++ }, 
global.personSkillsFromJigsaw = personSkillsFromJigsaw
global.personSkillsProcessed = personSkillsProcessed
global.personProjectFromJigsaw = personProjectFromJigsaw
global.unorderedPersonProjectFromJigsaw = unorderedPersonProjectFromJigsaw
global.personOnTheBeachFromJigsaw = personOnTheBeachFromJigsaw
global.personProjectProcessed = personProjectProcessed
global.personOnTheBeach = personOnTheBeach
global.peopleHeaders = peopleHeaders
