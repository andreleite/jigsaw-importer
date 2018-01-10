const knex = require('./knex-connection')

const preparePersonToInsert = (person) => {
    return {
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
    }
}

const insertPerson = async (person) => {
  return knex('people')
    .insert(preparePersonToInsert(person))
}

const insertPeople = async (people) => {
  const promises = people
    .map((current) => insertPerson(current))
    const results = await Promise.all(promises)
    return results
}

module.exports = {
  preparePersonToInsert,
  insertPerson,
  insertPeople
}
