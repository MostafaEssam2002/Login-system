const mongoose = require("mongoose");
const validate = require("validator"); 
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoURI = process.env.MONGODB_URI || "mongodb://mongodb:27017/E-commerce";
mongoose.connect(mongoURI).then(()=>{
    console.log("connected...")    
}).catch((err)=>{
    console.log(err);
})
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator :(val)=>{
                return validate.isEmail(val)
            },
            message:"{val} is not message "
        }
    },
    isAdmin:{type:Boolean,default:false},
    password:{
        type:String,
        required:true,
        minLength:5,
    },
})
userSchema.methods.genAuthToken=function (){
    const token = jwt.sign({userId:this._id,adminRole:this.isAdmin}, config.get("jwtsec"))
    return token;
}
const User = mongoose.model("User",userSchema)
module.exports = User;