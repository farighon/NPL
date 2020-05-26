const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mockAPIResponse = require('./mockAPI.js');

const app = express();

// cors for cross origin allowance
app.use(cors());

// set up of body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

// Aylien API
const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

/*const sentiment = textapi.sentiment({
  'text': 'I love Fridays'
}, function(error, response) {
  if (error == null) {
    console.log(response)
  }
});
*/

/*textapi.classify({
  'url': 'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'
}, function(error, response) {
  if (error == null) {
    console.log(response)
  }
})*/

app.use(express.static('dist'));

console.log(__dirname, '-- dirname');

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'));
});

app.get('/test', function (req, res) {
  console.log(req.body, '--req body')
  //res.send(mockAPIResponse);
  res.send(req.body)
});

app.get('/sentiment', function(req, res) {
  console.log('GET in the sentiment in server')
  console.log(req.query, '-- this is req.query in sentiment in server')
  console.log(req.body, '-- this is req.body in sentiment in server')
  //console.log(req, '-- this is req in sentiment in server')
  //console.log(req)
  textapi.sentiment({
    'text': req.query.input
  }, function(error, response) {
    console.log(response, '-- response in the sentiment')
    if (error == null) {
      console.log(response)
    }
    res.send(response);
  });

})


app.post('/addClassifyData', function(req, res) {
  console.log('post in server')
  console.log(req.query, 'query')
  // tempData.push(newEntry);
})

// designates what port the app will listen to for incoming requests
const PORT = 8082;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
