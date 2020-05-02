const JWTStrategy=require("passport-jwt").Strategy;
const ExtractJWT=require("passport-jwt").ExtractJwt;
const User=require("../Models/user");
const Config=require("../Config/config");

module.exports=function(passport)
{  
    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: Config.secretKey
    }
passport.use(new JWTStrategy(opts,(payload,done)=>{

User.getUserByID(payload._id,(err,user)=>{

if(err)
{
    
    return done(err,false)
}
if(user)
{
    return done(user,true)
}
else
{
    
    return done(null,false)
}
})
    }));
}