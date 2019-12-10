var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const autoInc = require('mongoose-auto-increment');
mongoose.connect('mongodb://localhost:27017/AUSSM', { useUnifiedTopology: true, useNewUrlParser: true });
autoInc.initialize(mongoose.connection);
const conn = mongoose.connection;
var dateUtils = require('date-utils');

const privateSchema = new mongoose.Schema({
    title: {
      type : String,
      required: true,
    },
    date : {
      type : Date,
      required : true,
    }
});

const universitySchema = new mongoose.Schema({
    title : {
      type: String,
      required : true,
    },
    date : {
      type : Date,
      required : true,
    },
    semester : {
      type : String,
      required : true,
    },
    subjectName : {
      type: String,
      required : true,
    }
});

privateSchema.plugin(autoInc.plugin, 'PrivateSchedule');
const privateModel = mongoose.model('PrivateSchedule',privateSchema);
universitySchema.plugin(autoInc.plugin, 'UniversitySchedule');
const universityModel = mongoose.model('UniversitySchedule',universitySchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',async function(req, res, next){
  var title = req.body.title;
  //var date = req.body.date;
  const date = req.body.date;
  console.log(typeof(date));
  //var dueDate = date.toFormat('YYYY-MM-DD');
  const privateSchedule = await privateModel.create({title : title, date : date});
  var unidate = new Date();
  const universitySchedule = await universityModel.create({title : 'Domain Analysis Assignment', date : unidate, semester : '3-2', subjectName : 'Domain Analysis'});

  const result2 = await universitySchedule.save();
  try {
    const result = await privateSchedule.save();
    res.send("true");
    console.log(result);
  }catch(err){
    console.error(err);
  }

});


router.get('/schedule', async function(req, res, next){
    try{
      const privateschedules = await privateModel.find({});
      const universityschdules = await universityModel.find({});
      console.log(privateschedules,universityschdules);
      res.send({pri : privateschedules, uni :universityschdules});
    }
    catch(err){
      console.log("gggg");
      console.error(err);
    }
})


module.exports = router;
