class Data {
    constructor(students, courses) {
      this.students = students;
      this.courses = courses;
    }
  }
  
  let dataCollection;
const fs = require('fs');

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('../data/students.json', 'utf8', (err, studentFile) => {
      if (err) {
        reject("Unable to read students.json");
        return;
      }

      fs.readFile('../data/courses.json', 'utf8', (err, courseFile) => {
        if (err) {
          reject("Unable to read courses.json");
          return;
        }

        try {
          const studentData = JSON.parse(studentFile);
          const courseData = JSON.parse(courseFile);

           dataCollection = new Data(studentData, courseData);
          resolve(dataCollection);
        } catch (err) {
          reject("Unable to parse JSON data");
        }
      });
    });
  });
}
function getAllStudents() {
    return new Promise((resolve, reject) => {
      if (dataCollection && dataCollection.students && dataCollection.students.length > 0) {
        resolve(dataCollection.students);
      } else {
        reject("No results returned");
      }
    });
  }
  function getTAs() {
    return new Promise((resolve, reject) => {
      if (dataCollection && dataCollection.students && dataCollection.students.length > 0) {
        const tas = dataCollection.students.filter((student) => student.TA === true);
        if (tas.length > 0) {
          resolve(tas);
        } else {
          reject("No results returned");
        }
      } else {
        reject("No students data available");
      }
    });
  }
  function getCourses() {
    return new Promise((resolve, reject) => {
      if (dataCollection && dataCollection.courses && dataCollection.courses.length > 0) {
        resolve(dataCollection.courses);
      } else {
        reject("No results returned");
      }
    });
  }
module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses
};
