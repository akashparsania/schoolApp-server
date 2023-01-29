var jwt=require('jsonwebtoken');
function validateToken(req,res,next){
var token=req.headers.Authorization;
console.log('checking token...')
if(token){
  jwt.verify(token,'appToken', function(e,s){
    if(e){
        res.send("Invalid Token...")
    }
    if(s){
        console.log("Token valid")
        next();

    }
  })
    
  

}
else{
    res.send('Token Missing...')
}
}

module.exports=validateToken;