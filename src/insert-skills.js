const knex = require('knex')({
  client: 'sqlite3',
  connection: {filename: process.env.DB}
})
const axios = require('axios')

const getAllIds = async () => {
  const employeeIdsFromDB = await knex.select('employeeId').from('people')

  return employeeIdsFromDB
    .reduce((accumulator, current) =>
      accumulator = accumulator.concat(current.employeeId), [])
}

const getPersonSkills = async (id) => {
  const response = await axios({
    url: `/people/${id}/skills`,
    method: 'get',
    baseURL: process.env.JIGSAW_URL,
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })
	return response.data
}

const createTable = async () => {
  await knex.schema.dropTableIfExists('skills')
  return await knex.schema.createTable('skills', (tbl) => {
		tbl.string('employeeId')
		tbl.string('name')
		tbl.string('rating')
		tbl.string('groupName')
  })
}

const getSkillsBatch = async (ids) => {
	const promises = ids
		.map(id => getPersonSkills(id))
	let out = await Promise.all(promises)
	return out
}


const insertPeopleSkills = async (ids) => {
	const BATCH_SIZE = 20
	let batches = Math.ceil(ids.length/BATCH_SIZE)
	let skills = []

	while (batches) {
		console.log(batches)
		const skillsBatch = await getSkillsBatch(ids.splice(0, BATCH_SIZE))
		skills = [...skills, skillsBatch]
		--batches
	}

	console.log(skills.length)
/*
	ids.forEach(async (id, index) => {
		const skills = await getPersonSkills(id)
		skills.forEach(async (skill) => {
			await knex('skills')
				.insert({
					employeeId: id,
					name: skill.name,
					rating: skill.rating,
					groupName: skill.group.name
				})
		})
	})
*/
}

module.exports = {
	createTable,
	getAllIds,
	getPersonSkills,
	insertPeopleSkills
}
