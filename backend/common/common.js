const jwt = require("jsonwebtoken")
const config= require("../config.json")

module.exports.userAuth= async (token) => {
    
    let flag=true
    if(!token) return false
    jwt.verify(token,config.authKey,(err,decoded)=>{ if(err) flag=false; })
    return flag
}