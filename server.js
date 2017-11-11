require('dotenv').config();

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const config         = require('./config.js');
const port = 3000;


app.use(bodyParser.json({ type: 'application/json' }));

MongoClient.connect(config.mongoUrl, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})
