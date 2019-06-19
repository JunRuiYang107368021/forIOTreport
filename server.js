// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var dbb = mongojs('fotIOT', ['watering', 'moisture']);
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var sd = require('silly-datetime');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/watering', function (req, res) {
  // watering?moiS=值&moiE=值
  // for test http://localhost:3000/watering?moiS=515&moiE=900
  var moistureStart = req.query.moiS ;
  var moistureEnd = req.query.moiE ;
  console.log(moistureStart);
  console.log(moistureEnd);
  var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(time);
  dbb.watering.insert({ 'moistureStart' : moistureStart, 'moistureEnd' : moistureEnd, 'Time' : time }, function(err,doc) {
    res.status(200).json('ok');
  }) 
})

app.get('/moisture/:moi', function(req,res){
  var moisture = req.params.moi ;
  var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(moisture) ;
  console.log(time) ;
  dbb.moisture.insert({ 'moisture' : moisture, 'Time' : time }, function(err,doc) {
    res.json('ok');
  })
})

app.get('/checkWatering', function(req,res) {
  var result = null ;
  dbb.watering.find(function(err,doc) {
    var result = doc ;
    console.log(result)
    dbb.moisture.findOne( function(err,doc) {
      result[5] = doc ;
      console.log(result[5]) ;
      res.status(200).json(result);
  })
})
});


app.get('/checkMoisture', function(req,res) {
  dbb.moisture.find(function(err,doc){
    res.status(200).json(doc);
  })
})


app.listen(3000);
console.log("Server running on port 3000");
