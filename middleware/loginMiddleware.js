const loginValidator = require("../validator/loginValidator.js");
module.exports = (req,res,nxt)=>{
    let valid = loginValidator(req.body);
    if(valid){
        nxt();
    }else{
        console.log("Error from login middleware validator ...")
        return res.status(403).json({msg:"Forbidden message"})
    }
}