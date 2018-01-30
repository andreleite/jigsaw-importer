require('dotenv').config()
const getPeople = require('./src/get-people')
const getSkills = require('./src/get-skills')
const utils = require('./src/utils')
let tries = 3

const process = async (insertPeople, getIds, insertSkills) => {

  if (!utils.hasJigsawApiSecret) throw new Error('You need to provide a enviroment variable called JIGSAW_API_SECRET')

  console.log('\nJIGSAW-IMPORTER')
  console.log('===============')

  try {
    console.log('\n## Getting total number of people\'s pages')
    const totalPeoplePages = await getPeople.getTotalPages()
    console.log('  - %s pages found', totalPeoplePages)

    const pages = utils.makeSequentialArray(totalPeoplePages)

    console.log('\n## Getting and inserting people')
    await utils.runTasksInBatchesWithRetry(pages, async (pagesBatch) => {
      const people = await getPeople.getPeople(pagesBatch)
      await insertPeople(people)
    })

    console.log('\n## Getting all people\'s ids')
    const ids = await getIds() 
    console.log('  - %s people found', ids.length)

    console.log('\n## Getting and inserting skills')
    await utils.runTasksInBatchesWithRetry(ids, async (idsBatch) => {
      const skills = await getSkills.getSkills(idsBatch)
      await insertSkills(skills)
    })

    console.log('\n## SUCCESS!')
  } catch(e) {
    if(tries) {
      tries--
      console.log('\n## Another try...')
      process(insertPeople, getIds, insertSkills)
    } else {
      throw e
    }
  }
}

module.exports = process
