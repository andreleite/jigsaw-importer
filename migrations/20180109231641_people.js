exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('people', (tbl) => {
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
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('people')
  ])
}
