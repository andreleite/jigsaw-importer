#!/usr/bin/env node
require('dotenv').config()
const knex = require('./src/knex-connection')
const getPeople = require('./src/get-people')
const insertPeople = require('./src/insert-people')
const getSkills = require('./src/get-skills')
const insertSkills = require('./src/insert-skills')
const utils = require('./src/utils')
let tries = 3

const process = async () => {

  if (!utils.hasJigsawApiSecret) throw new Error('You need to provide a enviroment variable called JIGSAW_API_SECRET')

  console.log()
  console.log('JIGSAW-IMPORTER')
  console.log('===============')

  try {
    console.log()
    console.log('## Updating DB schema')
    await knex.migrate.latest({directory: __dirname + '/migrations'})

    console.log()
    console.log('## Deleting old data')
    await knex('people').truncate()
    await knex('skills').truncate()

    console.log()
    console.log('## Getting total number of people\'s pages')
    const totalPeoplePages = await getPeople.getTotalPages()
    console.log('  - %s pages found', totalPeoplePages)

    const pages = utils.makeSequentialArray(totalPeoplePages)

    console.log()
    console.log('## Getting and inserting people')
    await utils.runTasksInBatchesWithRetry(pages, async (pagesBatch) => {
      const people = await getPeople.getPeople(pagesBatch)
      await insertPeople.insertPeople(people)
    })

    console.log()
    console.log('## Getting all people\'s ids')
    const ids = await getSkills.getAllIds()
    console.log('  - %s people found', ids.length)

    console.log()
    console.log('## Getting and inserting skills')
    await utils.runTasksInBatchesWithRetry(ids, async (idsBatch) => {
      const skills = await getSkills.getSkills(idsBatch)
      await insertSkills.insertSkills(skills)
    })

    console.log()
    console.log('## SUCCESS!')
  } catch(e) {
    if(tries) {
      tries--
      console.log()
      console.log('## Another try...')
      process()
    } else {
      throw e
    }
  }
}

process()
