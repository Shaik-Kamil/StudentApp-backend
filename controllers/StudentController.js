const express = require('express');
const controller = express.Router();
const studentData = require('../data/students.json');

//  get all students
controller.get('/', (req, res) => {
  const { start, limit } = req.query;

  let doesIdExist = [];

  let actualStart = +start <= 1 ? Number(start) - 1 : Number(start);

  let actualLimit =
    Number(limit) + Number(start) > studentData.students.length
      ? Number(start) + Number(limit) - (studentData.students.length - 1)
      : Number(limit) - 1;

  console.log(actualStart, actualLimit);
  for (let i = actualStart; i <= actualLimit; i++) {
    doesIdExist.push(studentData.students[i]);
  }
  console.log(studentData.students[6]);
  doesIdExist ? res.json(doesIdExist) : res.json({ studentData });
});
// get all students 5 at a time
// localhost:3000/students?start=1&limit=5=> //!should give first five
// localhost:3000/students?start=1&limit=5=> //!should give 6-10
// localhost:3000/students?start=1&limit=5=> //!should give 10-25
// get students by id

controller.get('/:id/', (req, res) => {
  const { id } = req.params;
  try {
    if (!/[0-9]/g.test(id)) {
      throw 'Students id must be a number';
    }

    const singleStudent = studentData.students.find(
      (student) => Number(student.id) === Number(id)
    );

    if (!singleStudent) {
      // if id is not a number, send a response with status 500 telling the user the id must be a number
      throw 'No students found with this id';
      res.json({ singleStudent });
    }
  } catch (error) {
    // if id is a number but there is no student with that id, tell the user and set status to 500
    res.status(500).send(error);
  }
});

module.exports = controller;
