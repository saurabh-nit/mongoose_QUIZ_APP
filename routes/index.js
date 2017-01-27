var express = require('express');
var router = express.Router();
var Questionbank = require('../models/questionbank');
var Short = require('../models/short');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {

  console.log('on server');
  Questionbank.find({ }).exec(function(err,datas){
           res.render('testpage', { title: 'Online Examination', questionbank : datas });
          });
  });


router.get('/leaderboard/:id?', function(req, res, next) {
      var curid =req.params.id;
      Short.find({ }).sort({score : -1}).exec(function(err,shorts){
        if(err)
            {}
        else {
            res.render('leaderboard', { shorts : shorts, cid : curid});
              //res.json(students);
             }
      })

});



router.post('/',function(req,res, next){
       var data = req.body;        // data coming from client
      // res.send(data1);          // send response to clint
      console.log(data);       // will show on server terminal

      var timenow = moment().format('LLL');
      console.log(timenow);

      var tester = req.body.cname;
      console.log(tester);


      var score1 = 0;
      Questionbank.find({}).select({correct : 1, _id : 1}).exec(function(err,serverdata){
                     if(err){
                        //  return res.json({
                        //            error : true,
                        //            reason : err,
                        //  });
                        console.log(err);
                     }

       console.log(serverdata);
         if(serverdata.length==5){

         serverdata.forEach(function (el){
              data.respond.forEach(function (ele){
                if(el._id == ele.qid){
                        if(el.correct == ele.resp)
                           score1 = score1 + 10;
                }
              });

            });
          //console.log(score1);
        }
        //console.log(score1);

       var currentCandidate = {
                name : tester,
               score : score1,
                time : timenow
       }

       var newdata = new Short(currentCandidate);
       newdata.save(function(err,result){
   //   console.log(err);

            if(err){
               return res.json({
                             error : true,
                             reason : err,
                              });
          }else{
            var insertid = result._id;
            console.log(insertid);

               return res.json({
                             error : false,
                                cid: result._id
                             });
               }
       });








     });
  });








module.exports = router;
