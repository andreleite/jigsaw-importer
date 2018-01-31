require('dotenv').config()
const getPeople = require('./src/get-people')
const getSkills = require('./src/get-skills')
const utils = require('./src/utils')

function fetchAndInsert(name, fetcher) {
  return async function(params, inserter) {
    console.log('  - %s found', params.length)

    console.log(`\n## Getting and inserting ${name}`)
    await utils.runTasksInBatchesWithRetry(params, async (batch) => {
      const data = await fetcher(batch)
      await inserter(data)
    })
  }
}

const process = async (action, data, inserter) => {
  let tries = 3

  if (!utils.hasJigsawApiSecret) throw new Error('You need to provide a enviroment variable called JIGSAW_API_SECRET')

  try {
    await action(data, inserter)

    console.log('\n## Skills inserted to database!')
  } catch(e) {
    if(tries) {
      tries--
      console.log('\n## Another try...')
      await process(data, inserter)
    } else {
      throw e
    }
  }
}

const fetchSkillsAndInsert = async (insertSkills, ids) => {
  await process(fetchAndInsert('skills', getSkills.getSkills), ids, insertSkills)
}

const fetchPeopleAndInsert = async (insertPeople) => {
  console.log('\n## Getting total number of people\'s pages')
  const totalPeoplePages = await getPeople.getTotalPages()
  const peoplePages = utils.makeSequentialArray(totalPeoplePages)

  await process(fetchAndInsert('people', getPeople.getPeople), peoplePages, insertPeople)
}

module.exports = {
  fetchPeopleAndInsert,
  fetchSkillsAndInsert
}
