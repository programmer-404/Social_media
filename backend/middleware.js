var userController=require("./controller/user.controller")


module.exports.registerUser= async (req,res,next) =>{
    let userClass = new userController(req,"register");
    let registerUserResp = await userClass.registerUser(req,res,next)
    res.send(registerUserResp)
}

module.exports.userLogin= async (req, res, next) => {
    let userClass = new userController(req,"login");
    let userLoginResp = await userClass.userLogin(req,res,next)
    res.send(userLoginResp)
}