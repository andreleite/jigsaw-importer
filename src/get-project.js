const axios = require('axios')

const getPersonProject = async (id) => {
  const response = await axios({
    url: `/people/${id}/work_experiences`,
    method: 'get',
    baseURL: 'https://jigsaw.thoughtworks.net/api',
    headers: {'Authorization': process.env.JIGSAW_API_SECRET}
  })

  lastWorkExperience = getLastWorkExperience(response)

  return {
    employeeId: id,
    project: getProjectName(lastWorkExperience) 
  }
}

getLastWorkExperience = (response) => {
  workExperienceComparator = (firstExperience, secondExperience) => {
    firstDate = firstExperience.duration.endsOn
    secondDate  = secondExperience.duration.endsOn

    if(firstDate < secondDate)
      return -1
    if(firstDate > secondDate)
      return 1
    return 0
  }
  return response.data.sort(workExperienceComparator)[0]
}

getProjectName = (workExperience) => {
  if(workExperience === undefined || personIsOnTheBeach(workExperience)){
    return "On The Beach"
  }
  return workExperience.project.name;
}

personIsOnTheBeach = (workExperience) => {
  return new Date(workExperience.duration.endsOn) < new Date()
}

module.exports = {
  getPersonProject
}
