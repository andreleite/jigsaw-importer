const knex = require('knex')({
  client: 'sqlite3',
  connection: {filename: process.env.DB}
})

const createTable = async () => {
  await knex.schema.dropTableIfExists('people')
  return await knex.schema.createTable('people', (tbl) => {
		tbl.string('employeeId')
		tbl.string('loginName')
		tbl.string('preferredName')
		tbl.string('gender')
		tbl.string('preferredPronounsEnglish')
		tbl.string('preferredPronounsOther')
		tbl.string('pictureUrl')
		tbl.string('roleName')
		tbl.string('gradeName')
		tbl.string('departmentName')
		tbl.string('hireDate')
		tbl.string('totalExperience')
		tbl.string('twExperience')
		tbl.string('assignable')
		tbl.string('homeOfficeName')
		tbl.string('workingOfficeName')
		tbl.string('staffingOfficeName')
		tbl.string('projectPreferences')
		tbl.string('longTermGoal')
		tbl.string('travelPreferencesDomestic')
		tbl.string('travelPreferencesInternational')
		tbl.string('travelPreferencesTravelDetails')
  })
}

const insertPerson = async (person) => {
  return knex('people')
    .insert({
			employeeId: person.employeeId,
			loginName: person.loginName,
			preferredName: person.preferredName,
			gender: person.gender,
			preferredPronounsEnglish: person.preferredPronouns.english.join(','),
			preferredPronounsOther: person.preferredPronouns.other,
			pictureUrl: person.picture.url,
			roleName: person.role.name,
			gradeName: person.grade.name,
			departmentName: person.department.name,
			hireDate: person.hireDate,
			totalExperience: person.totalExperience,
			twExperience: person.twExperience,
			assignable: person.assignable,
			homeOfficeName: person.homeOffice.name,
			workingOfficeName: person.workingOffice.name,
			staffingOfficeName: person.staffingOffice.name,
			projectPreferences: person.projectPreferences,
			longTermGoal: person.longTermGoal,
			travelPreferencesDomestic: person.travelPreferences.domestic,
			travelPreferencesInternational: person.travelPreferences.international,
			travelPreferencesTravelDetails: person.travelPreferences.travelDetails
    })
}

const insertPeople = async (people) => {
  const promises = people
    .map((current) => insertPerson(current))
  const results = await Promise.all(promises)
  return results
}

module.exports = {
  createTable,
  insertPerson,
  insertPeople
}
