class Data {
    constructor(students, courses) {
      this.students = students;
      this.courses = courses;
    }
  }
  
  let dataCollection = null;
  const fs = require('fs');
  
  function initialize() {
    const studentsPromise = new Promise((resolve, reject) => {
      fs.readFile('../data/students.json', 'utf8', (err, dataFromSomeFile) => {
        if (err) {
            reject('Unable to read students.json');
          return;
        }
  
        const students = JSON.parse(dataFromSomeFile);
        resolve(students);
      });
    });
  
    const coursesPromise = new Promise((resolve, reject) => {
      fs.readFile('../data/courses.json', 'utf8', (err, dataFromCourse) => {
        if (err) {
            reject('Unable to read courses.json');
          return;
        }
  
        const courses = JSON.parse(dataFromCourse);
        resolve(courses);
      });
    });
  
    Promise.all([studentsPromise, coursesPromise])
      .then(([students, courses]) => {
        dataCollection = new Data(students, courses);
  
        // Call any other functions or perform additional operations with the data
        console.log(dataCollection.students);
        console.log(dataCollection.courses);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  initialize();

  function getAllStudents(){
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
          resolve(dataCollection.students);
        } else {
          reject('No results returned');
        }
      });

}
getAllStudents()
function getTAs() {
    return new Promise((resolve, reject) => {
      if (dataCollection && dataCollection.students.length > 0) {
        const tas = dataCollection.students.filter((student) => student.TA === true);
        if (tas.length > 0) {
          resolve(tas);
        } else {
          reject('No results returned');
        }
      } else {
        reject('No results returned');
      }
    });
  }
function getCourses() {
    return new Promise((resolve, reject) => {
      if (dataCollection && dataCollection.courses.length > 0) {
        resolve(dataCollection.courses);
      } else {
        reject('No results returned');
      }
    });
  }
