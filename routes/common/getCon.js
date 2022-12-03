var mongodb=require('mongodb');

function getCon(res,cb){
    var url="mongodb+srv://nit:nit@cluster0.dahty9n.mongodb.net/?retryWrites=true&w=majority" 
    var mongoClient=mongodb.MongoClient;
    mongoClient.connect(url)
    .then((server)=>{
      var db=server.db('school')
      cb(db);
})


}

module.exports=getCon;