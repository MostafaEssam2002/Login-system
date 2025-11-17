const student = require("../model/Student");
class studentController{
    async getAllStudents(req,res){
        const data = await student.find();
        res.status(200).json(data)
    }    
    async addStudent(req,res){
        const lastStudent = await student.findOne().sort({ id: -1 });
        const newId = lastStudent ? lastStudent.id + 1 : 1;
        let newStudent = new student({
            fn:req.body.fn,
            ln:req.body.ln,
            age:req.body.age,
            dept:req.body.dept,
            id:newId,
        }) 
        await newStudent.save();
        console.log("new student added successfully ...");
        res.status(200).json(newStudent);
    }
    async getStudentById(req, res) {
        const studentId = parseInt(req.params.id);
        const data = await student.findOne({ id: studentId });
        if (!data) return res.status(404).json({ msg: "Student not found" });
        res.status(200).json(data);
    }
    async updateStudent(req,res){
        let std = await student.findOneAndUpdate({id: parseInt(req.params.id)},req.body,{new:true});
        if(std){
            return res.status(200).json(std)
        }else{
            return res.status(404).json({msg:"Student not found"});
        }
    }
    async deleteStudent(req,res){
        let std = await student.findOneAndDelete({id:parseInt(req.params.id)})
        if (std){
            return res.status(200).json({msg:"Student deleted Successfully.."})
        }else{
            return res.status(404).json({msg:"Student not found"})
        }
    }
}
module.exports = new studentController();
