const user = require("../model/User.js");
async function updatedUser(req,res,nxt){
    let updatedUser = await user.findByIdAndUpdate({_id:req.params.id},{isAdmin:true})
    if(updatedUser){
        return res.status(200).json({ msg: "User role is set to admin", user: updatedUser });
    }else{
        return res.status(404).json({ msg: "User not found" });
    }
}
module.exports = updatedUser;
