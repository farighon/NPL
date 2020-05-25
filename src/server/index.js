var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

// set up of body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

// Aylien API
const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

textapi.sentiment({
  'text': 'I love Fridays'
}, function(error, response) {
  if (error == null) {
    console.log(response)
  }
});

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
  res.send(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
const PORT = 8081;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
