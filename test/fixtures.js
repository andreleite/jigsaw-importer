module.exports = {
  person: {
    employeeId: '666',
    loginName: 'xyyy',
    preferredName: 'Xxx Yyy',
    gender: 'Man',
    preferredPronouns: { english: [], other: '' },
    picture: { url: 'https://example.com' },
    role: { name: 'BA' },
    grade: { name: 'Con' },
    department: { name: 'Professional Services' },
    hireDate: '1970-01-01',
    totalExperience: 2,
    twExperience: 1,
    assignable: true,
    homeOffice: { name: 'Melbourne' },
    workingOffice: { name: 'London' },
    staffingOffice: { name: 'London' },
    projectPreferences: '',
    longTermGoal: '',
    travelPreferences: { domestic: true, international: true, travelDetails: '' }
  },
  personSkillsFromJigsaw: [
    {
      "name": "AWS",
      "rating": 0,
      "group": {
        "name": "Technical"
      }
    },
    {
      "name": "Android",
      "rating": 1,
      "group": {
        "name": "Technical"
      }
    }
  ],
  personSkillsProcessed: [
    {
      "employeeId": "666",
      "name": "AWS",
      "rating": 0,
      "group": {
        "name": "Technical"
      }
    },
    {
      "employeeId": "666",
      "name": "Android",
      "rating": 1,
      "group": {
        "name": "Technical"
      }
    }
  ],
  peopleHeaders: {
    'cache-control': 'must-revalidate, private, max-age=0',
    'content-type': 'application/json; charset=utf-8',
    date: 'Fri, 05 Jan 2018 18:35:04 GMT',
    etag: '"9062dcda26211fe7a7594060e6421150"',
    link: '<https://jigsaw.thoughtworks.net/api/people?page=2>; rel="next",<https://jigsaw.thoughtworks.net/api/people?page=52>; rel="last"',
    'x-rack-cache': 'miss',
    'x-runtime': '0.214000',
    'x-total-count': '5108',
    'x-total-pages': '30',
    'x-ua-compatible': 'IE=Edge,chrome=1',
    'transfer-encoding': 'chunked',
    connection: 'Close'
  }
}
