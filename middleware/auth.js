const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = async (req,res,nxt)=>{
    const token = req.header("X-auth-token");
    if(token){
        console.log(token)
        try {
            const decodedToken = await jwt.verify(token,config.get("jwtsec"))
            if(decodedToken.adminRole){
                nxt();
            }else{
                return res.status(401).json({msg:"Access denied..."})
            }
        } catch(err) {
            return res.status(401).json({msg:"Invalid or expired token"})
        }
    }else{
        return res.status(401).json({msg:"Access denied..."})
    }
}