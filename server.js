// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var dbb = mongojs('fotIOT', ['Watering', 'Moisture']);
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var sd = require('silly-datetime');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/watering', function (req, res) {
  // watering?moiS=值&moiE=值
  // for test http://localhost:3000/Watering?moiS=515&moiE=900
  var moistureStart = req.query.moiS ;
  var moistureEnd = req.query.moiE ;
  console.log(moistureStart);
  console.log(moistureEnd);
  var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(time);
  dbb.Watering.insert({ 'moistureStart' : moistureStart, 'moistureEnd' : moistureEnd, 'Time' : time }, function(err,doc) {
    res.status(200).json('ok');
  }) 
})

app.get('/moisture/:moi', function(req,res){
  var moisture = req.params.moi ;
  var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(moisture) ;
  console.log(time) ;
  dbb.Moisture.insert({ 'moisture' : moi, 'Time' : time }, function(err,doc) {
    res.json('ok');
  })
})

app.get('/checkWatering', function(req,res) {
  dbb.Watering.find(function(err,doc) {
    res.status(200).json(doc);
  })
})

app.get('/checkMoistrue', function(req,res) {
  dbb.moisture.find(function(err,doc){
    res.status(200).json(doc);
  })
})


app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.status(200).json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");