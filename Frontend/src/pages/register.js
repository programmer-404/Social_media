import React from 'react'
import { useState } from 'react'
import {Link} from "react-router-dom"
import registerApi from "../Api/register"

export default function Register() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [mobileNo, setmobileNo] = useState("")
    const [email, setemail] = useState("")
    const [errmsg, seterrmsg] = useState("");
    const [successmsg, setsuccessmsg] = useState("");
    
    const userRegister=async ()=>{
        if(!username || !password || !email || !mobileNo ){
            seterrmsg("Please Enter all required fields");
            return false
        }
        if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)){
            seterrmsg("Please Enter Valid Email Address");
            return false
        }
        if (!/^[789]\d{9}$/.test(Number(mobileNo))) {
            seterrmsg("Please Enter Valid Mobile Number");
            return false
        }
        let request={username,password,fname,lname,mobile_no: mobileNo,email}
        let result =await registerApi(request);
        if(!result || !result.status){
            seterrmsg(result.data.message)
            setsuccessmsg("")
        }else{
            seterrmsg("")
            setsuccessmsg(result.data.message)
        }
        console.log("resultt",result)

    
    }
    return (
        <div className="box-container-register">
            <div className='siteName'>Socio</div>
            <label htmlFor="username" className='label'>Username</label>
            <input type="text" name='username' className='input' value={username} placeholder='Enter Username Here....' onChange={(e)=>{setusername(e.target.value.trim())}}/>
            <label htmlFor="password" className='label'>Password</label>
            <input type="password" name="password" className='input' value={password} placeholder='Enter Password Here....' onChange={(e)=>{setpassword(e.target.value.trim())}}/>
            <label htmlFor="fname" className='label'>First Name</label>
            <input type="text" name="fname" className='input' value={fname} placeholder='example' onChange={(e)=>{setfname(e.target.value.trim())}}/>
            <label htmlFor="lname" className='label'>Last Name</label>
            <input type="text" name="lname" className='input' value={lname} placeholder='Dolby' onChange={(e)=>{setlname(e.target.value.trim())}}/>
            <label htmlFor="email" className='label'>Email</label>
            <input type="email" name="email" className='input' value={email} placeholder='abc@example.com' onChange={(e)=>{setemail(e.target.value.trim())}}/>
            <label htmlFor="mobileNo" className='label'>Mobile Number</label>
            <input type="tel" name="mobileNo" className='input' placeholder="0000000000" onChange={(e)=>{setmobileNo(e.target.value.trim())}} required/>    
            <button className='registerBtn' onClick={()=>{userRegister()}}>Register</button>
            <div>
                <p>{errmsg ? errmsg : successmsg}</p>
                <p>Already a member Login <Link to="/login" >Here...</Link></p>
            </div>
        </div>
    )
}
