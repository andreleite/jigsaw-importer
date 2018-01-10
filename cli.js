#!/usr/bin/env node
require('dotenv').config()
const databaseSchema = require('./src/database-schema')
const getPeople = require('./src/get-people')
const insertPeople = require('./src/insert-people')
const getSkills = require('./src/get-skills')
const insertSkills = require('./src/insert-skills')

const process = async () => {
/*
  console.log('deleting data')
  await databaseSchema.truncatePeople()
  await databaseSchema.truncateSkills()

  console.log('getting total number of people\'s pages')
  const totalPeoplePages = await getPeople.getTotalPages()
  console.log('%s pages found', totalPeoplePages)

  console.log('getting all people')
  const people = await getPeople.getAllPeople(totalPeoplePages)
  console.log('%s people found', people.length)

  console.log('inserting people')
  await insertPeople.insertPeople(people)
  console.log('people inserted')
*/
  console.log('getting all people\'s ids')
  const ids = await getSkills.getAllIds()
  console.log('%s ids found', ids.length)

  console.log('getting all people\'s skills')
  const skills = await getSkills.getAllPeopleSkills(ids)
  console.log(skills[2])
  //console.log('%s ids found', ids.length)
/*
  console.log('inserting skills')
  await insertSkills.insertPeopleSkills(ids)
  console.log('skills inserted')
*/
}

process()
