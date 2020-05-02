const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const config=require("../Config/config");

var userSchema=mongoose.Schema({
Name:{
    type:String
},
Email:{
    type:String,
    required:true
},
UserName:{
    type:String,
    required:true
}
,Password:{
    type:String,
    required:true
}




});
const user=module.exports=mongoose.model('User',userSchema);

module.exports.getUserByID=function(id,callback){
    console.log(id)
user.findById(id,callback)
}

module.exports.getUserByUserName=function(userName,callback){
  
    const query={UserName:userName}
    user.findOne(query,callback)
    }

    module.exports.addUser=function(newUser,callback)
    {
       
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.Password,salt,(err,hash)=>{
                if(err)
                throw(err);
                newUser.Password=hash;
             
                newUser.save(callback);
            })
        })
    }
    module.exports.comparePassword=function(candidatePassword,hash,callback)
    {
        bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
            if(err) throw err;
            callback(null,isMatch);
        });
    }