const User = require("../model/User.js");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("config")
class UserAuthentication {
    async register (req,res,nxt){
        try{
            let findUser = await User.findOne({email:req.body.email}).exec();
            if(findUser){
                return res.status(400).json({msg:"User already exists "})
            }else{
                let salt=await bcrypt.genSalt(10);
                let hashedPassword =await bcrypt.hash(req.body.password,salt)
                let user = new User({
                    email:req.body.email,
                    name:req.body.name,
                    password:hashedPassword,
                    isAdmin: req.body.isAdmin
                })
                await user.save()
                const token =user.genAuthToken()
                res.header("X-auth-token",token)
                console.log("user added successfully ...")
                return res.status(200).json({msg:"user added successfully ..."})
            }
        }catch(err){
            nxt(err);
    }}
    async login(req,res,nxt){
        try{
            const user = await User.findOne({email:req.body.email}).exec();
            if(user){
                console.log("user found")
                const validPassword = await bcrypt.compare(req.body.password,user.password)
                if(validPassword){
                    const token = user.genAuthToken();
                    res.header("X-auth-token", token); 
                    return res.status(200).json({msg:"Login completed Successfully ..."})
                }else{
                    return res.status(400).json({msg:"Error email or password..."})
                }
            }else{
                const validPassword = await bcrypt.compare(req.body.password,"$2b$10$1234567890123456789012")
                console.log("user not found")
                res.status(400).json({msg:"Error email or password..."})
            }}catch(err){
                nxt(err);
            }
        }
}
module.exports =new UserAuthentication ();