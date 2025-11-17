
const validator = require("../validator/ajv.js");
module.exports = (req,res,nxt)=>{
    let valid = validator(req.body);
    if(valid){
        req.valid = 1 
        nxt();
    }else{
        res.status(403).json({msg:"Forbidden message"})
    }
}
