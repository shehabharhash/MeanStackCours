const express=require('express');
const router=express.Router();
const User=require('../Models/user');
const pasport=require('passport');
const JWT=require('jsonwebtoken');
const Config=require('../Config/config');



router.post('/register',(req,res,next)=>{
    
    console.log(req.body)
    
    let newUser=new User({
        Name:req.body.name,
        Email:req.body.email,
        UserName:req.body.username,
        Password: req.body.password,
    })
    User.addUser(newUser,(err,user)=>{
       
        if(err)
        {
            res.json({success:false,msg:'Failed to regiter user'})
        }
        else
        {
            res.json({success:true,msg:'User Registered'})
        }
    })
})

router.post('/authenticate',(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;
 
    User.getUserByUserName(username,(err,user)=>{
        console.log(user)
if(err)
throw err;
{if(!user)
return res.json({success:'failed',msg:'sorry this user is not authenticated'})
else
{
    User.comparePassword(password,user.Password,(err,isMatch)=>{
        if(err) throw err;
        {if(isMatch) 
        {
            const jwtUser={
                id:user.id,
                name:user.Name,
                email:user.Email,
                username:user.UserName
            }
            console.log(jwtUser);
            const token=JWT.sign(jwtUser, Config.secretKey, { expiresIn: '5d' })
            console.log(token)
            return res.json({success:'true',token: token,
            user:{
                id:user._id,
                name:user.Name,
                username:user.username,
                email:user.email
            }})

        }
        else
        return res.json({success:'true',msg:'Wrong Password '})
    }

    })

}
}
    })
})

router.get('/profile',pasport.authenticate('jwt',{session:false}),(req,res,next)=>{
    console.log(req);
    
    res.json({success:'true',user:res});
})


module.exports=router