const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb://mongodb:27017/E-commerce";
mongoose.connect(mongoURI).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err);
})
const studentSchema = new mongoose.Schema({
    fn:{type:String,required:true,minLength:3,maxLength:50,trim:true},
    ln:{type:String},
    dept:{type:String,required:true,default:"CS"},
    age:{type:Number,required:true},
    id:{type:Number,required:true},
})
const Student = mongoose.model("Student",studentSchema)
module.exports =   Student;
// module.exports = new studentController();