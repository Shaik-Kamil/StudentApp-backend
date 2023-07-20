const express = require('express');
const app = express();
const studentController = require('./controllers/StudentController.js');

//  handle a get request at '/test' that responds with an object like this

app.use('/students', studentController);

app.get('/', (request, response) => {
  response.send('hello world!');
});

// app.get('/students', (request, response) => {
//   response.json({ success: true });
// });

// app.get('*', (req, res) => {
//   res.status(404).send('Page does not exist');
// });
module.exports = app;
