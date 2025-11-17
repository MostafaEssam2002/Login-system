const validator = require("../validator/registerValidator.js");
module.exports = (req,res,nxt)=>{
    let valid = validator(req.body);
    if(valid){
        req.valid = 1 ;
        nxt();
    }else{
        console.log("hahahahah")
        return res.status(403).json({msg:"Forbidden message"})
    }
}