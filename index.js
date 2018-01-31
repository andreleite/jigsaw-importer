require('dotenv').config()
const getPeople = require('./src/get-people')
const getSkills = require('./src/get-skills')
const utils = require('./src/utils')
let tries = 3

const fetchAndInsert = async (label, fetcher, params, inserter) => {
  console.log('  - %s found', params.length)

  console.log(`\n## Getting and inserting ${label}`)
  await utils.runTasksInBatchesWithRetry(params, async (batch) => {
    const data = await fetcher(batch)
    await inserter(data)
  })
}

const process = async (label, fetcher, params, inserter) => {
  if (!utils.hasJigsawApiSecret) throw new Error('You need to provide a enviroment variable called JIGSAW_API_SECRET')

  try {
    await fetchAndInsert(label, fetcher, params, inserter)

    console.log('\n## Database population finished!')
  } catch(e) {
    if(tries) {
      tries--
      console.log('\n## Another try...')
      await process(label, fetcher, params, inserter)
    } else {
      throw e
    }
  }
}

const fetchSkillsAndInsert = async (insertSkills, ids) =>
  await process('skills', getSkills.getSkills, ids, insertSkills)

const fetchPeopleAndInsert = async (insertPeople) => {
  console.log('\n## Getting total number of people\'s pages')
  const totalPeoplePages = await getPeople.getTotalPages()
  const peoplePages = utils.makeSequentialArray(totalPeoplePages)

  await process('people', getPeople.getPeople, peoplePages, insertPeople)
}

module.exports = {
  fetchPeopleAndInsert,
  fetchSkillsAndInsert
}
