var express = require('express');
var router = express.Router();
var mongodb= require('mongodb');
var getCon=require('./common/getCon');
var jwt=require('jsonwebtoken');
const validateToken = require('./common/validateToken');



// 1. get all collections from db

//url: http://localhost:2020/reg/get-std
//method: get

router.get('/get-std', function(req, res, next) {
 
  getCon(res,function(db){
    var collection=db.collection('students')
    collection.find({}).toArray()
    .then((data)=>{
      res.send(data)
    })
    .catch((e)=>{
      res.send(e)
    })
    
  })

  
  
 

  });



  //2. inset data to db   

  //url: http://localhost:2020/reg/reg-std
//method: post

router.post('/reg-std',function(req,res,next){

    var data=req.body.payload
    
    getCon(res,function(db){
     var collection=db.collection('students')
      collection.insertOne(data)
      .then((s)=>{
        res.send(s)
      })
      
    
 
    })
  })



  //3. get data based on id

  //url: http://localhost:2020/reg/get-std-by-id?id=
  //method: get

  router.get('/get-std-by-id',validateToken,function(req,res,next){
   var id= req.query.id;
   getCon(res,function(db){
    var collection=db.collection('students')
    collection.findOne({_id:id})
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
      console.log(err)

    })
   })
  })


  //4. authentication

  //url: http://localhost:2020/reg/login
  //method: post

  router.post('/login',function(req,res,next){
    var data= req.body.payload;
    getCon(res,function(db){
     var collection=db.collection('students')
     collection.findOne(data)
     .then((result)=>{
      if(result){
      
        var token=jwt.sign(data,'appToken');
        result.token=token;
        
      }
      
     
       res.send(result)
     })
     .catch((err)=>{
       res.send(err)
       console.log(err)
 
     })
    })
   })


   //4. update the data
   //url: http://localhost:2020/reg/update-std/5
  //method: put
   
   router.put('/update-std/:id',function(req,res,next){
    var id=req.params.id;
    var data=req.body.payload;

    getCon(res,function(db){
      var collection=db.collection('students');
      collection.updateOne({_id:id},{$set:data})
      .then((response)=>{
        res.send(response);
      })
      .catch((response)=>{
        console.log(response)
        res.send(response);
       
      })
    })

   })


   
   //5. delete the data
   //url: http://localhost:2020/reg/delete-std/5
  //method: put
   
  router.delete('/delete-std/:id',function(req,res,next){
    var id=req.params.id;
    

    getCon(res,function(db){
      var collection=db.collection('students');
      collection.deleteOne({_id:id})
      .then((response)=>{
        res.send(response);
      })
      .catch((response)=>{
        console.log(response)
        res.send(response);
       
      })
    })

   })
  module.exports = router;