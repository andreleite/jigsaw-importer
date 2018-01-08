#!/usr/bin/env node
require('dotenv').config()
const getPeople = require('./src/get-people')
const insertPeople = require('./src/insert-people')
const insertSkills = require('./src/insert-skills')

const process = async () => {

  //console.log('getting total number of people\'s pages')
  //const totalPeoplePages = await getPeople.getTotalPages()
  //console.log('%s pages found', totalPeoplePages)

  //console.log('getting all people')
  //const people = await getPeople.getAllPeople(totalPeoplePages)
  //console.log('%s people found', people.length)

  //console.log('creating people\'s database table')
  //await insertPeople.createTable()

  //console.log('inserting people')
  //await insertPeople.insertPeople(people)
  //console.log('people inserted')

  console.log('getting all people\'s ids')
  const ids = await insertSkills.getAllIds()
  console.log('%s ids found', ids.length)

  console.log('creating skill\'s database table')
  await insertSkills.createTable()

  console.log('inserting skills')
  await insertSkills.insertPeopleSkills(ids)
  console.log('skills inserted')
}

process()
