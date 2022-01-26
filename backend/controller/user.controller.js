
const db=require("../dbConnection");
const encryt_decrypt=require("../encryt_decrypt")
const jwt=require("jsonwebtoken")
const config=require("../config.json")
const common=require("../common/common")

module.exports= class userController{
    constructor(req,apiName){
        this.response={status:false,data:{}}
        this.requestBody=req.body
        this.apiName=apiName
    }
    async validateRequest(){
        if(this.apiName=="reset" && (!this.requestBody.username || !this.requestBody.newPassword)){
            this.response.data.message = "Required Parameters Missing"
            return false
        }
        if(this.apiName !=="reset" && (!this.requestBody.username || !this.requestBody.password || ( this.apiName=="register" && !this.requestBody.mobile_no ))){
            this.response.data.message="Required Parameters Missing"
            return false
        }
        if( this.apiName=="register" && !( /^[0-9]{10}$/.test(this.requestBody.mobile_no))){
            this.response.data.message="Enter Valid Mobile Number"
            return false
        } 
        return true
    }
    async registerUser(req,res,next){
        try{
            console.log('ip address',req.ip);
            let validation=await this.validateRequest();
            if(!validation) return this.response;
            let checkusername= await this.checkDuplicateUserName();
            if(!checkusername) return this.response;
            
            let user_id=this.requestBody.username + "_" + Date.now();
            console.log("user_id--------------------------------------------------",user_id);
            this.requestBody.password=await encryt_decrypt.encrypt(this.requestBody.password);
            console.log("password-------------------------------------------------",this.requestBody.password);
            let query =`INSERT INTO Social_Media.user
                        ( user_id,username , password , user_image , first_name , last_name , user_email , mobile_no , creation_time , creator_ip )
                        VALUES (?,?,?,?,?,?,?,?,?,?)`;
            let values=[user_id, this.requestBody.username,this.requestBody.password,this.requestBody.user_image,this.requestBody.fname, this.requestBody.lname,this.requestBody.email,Number(this.requestBody.mobile_no),new Date,req.ip]
            let result = await db.executevaluesquery(query,values)
            
            if(result.affectedRows>0){
                this.response.status=true
                this.response.data.message="Registration Successful"
            }else{
                this.response.data.message="Registration Failed"
            }
            return this.response
        }catch(err){ 
            console.log("err",err);
            this.response.data.message="connection timeout"
            return this.response
        }
    } 
    async checkDuplicateUserName(){
        let query ="select * from Social_Media.user where username= ?";
        let values=[this.requestBody.username];
        let result= await db.executevaluesquery(query,values);
        if(result.length>0) {
            this.response.data.message="Username already exists"
            return false
        }
        return true
    }

    async userLogin(req,res,next){
        try{
            let validation = await this.validateRequest();
            if(!validation) return this.response
            // this.requestBody.password=await encryt_decrypt.encrypt(this.requestBody.password)
            let result = await this.validateUsername()
            if (!result) return this.response
            let decryptedPassword = await encryt_decrypt.decrypt(result[0].password)
            let accessToken=jwt.sign(this.requestBody.username,config.authKey)
            console.log("decrypted password",decryptedPassword);
            console.log(decryptedPassword==this.requestBody.password);
            if(decryptedPassword!=this.requestBody.password){
                this.response.data.message="Password not matched"
                return this.response
            }
            this.response.status=true
            this.response.data.token=accessToken
            this.response.data.message="Login Successful"
            return this.response
        }
        catch(err){
            console.log("err",err);
            this.response.data.message="connection timeout"
            return this.response
        }
    }

    async validateUsername(){
        let query="select * from Social_Media.user where username = ?";
        let values=[this.requestBody.username];
        let result = await db.executevaluesquery(query,values);
        console.log("result",result);

        if(!result || result.length==0){
            this.response.data.message = "Username Not Matched"
            return false
        }
        return result
    }

    async userDetail(req,res,next){
        let loginAuth = await common.userAuth(req.headers.accesstoken)
        
        if(!loginAuth) {
            this.response.data.message="Please Login To Continue"
            return this.response
        }
        this.response.data.message="ok";
        this.response.status=true;
        return this.response
    }
    
    async resetPassword(req,res,next){
        let validation = await this.validateRequest();
        if(!validation) return this.response
        let result = await this.validateUsername();
        if (!result) return this.response
        this.requestBody.newPassword=await encryt_decrypt.encrypt(this.requestBody.newPassword);
        let query=
        this.response.data.message="ok";
        this.response.status=true;
        return this.response
    }
}