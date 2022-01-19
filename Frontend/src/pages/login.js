import React from 'react'
import { useState } from 'react'
import { loginApi } from '../Api/login';
import {Link} from "react-router-dom"

export default function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [errmsg, seterrmsg] = useState("")
    const [successmsg, setsuccessmsg] = useState("")
    const userLogin=async ()=>{
        if(!username || !password ){
            seterrmsg("Please Enter Credentials");
            return false
        }
        let request = { username,password };
        let result =await loginApi(request);
        if(!result || !result.status){
            seterrmsg(result.data.message)
            setsuccessmsg("")
        }else{
            seterrmsg("")
            setsuccessmsg(result.data.message)
        }
    }
    return (
            <div className="box-container">
                <h1 className='siteName'>Socio</h1>
                <label htmlFor="username" className='label'>Username</label>
                <input type="text" name='username' className='input' value={username} placeholder='Enter Username Here....' onChange={(e)=>{setusername(e.target.value.trim())}}/>
                <label htmlFor="password" className='label'>Password</label>
                <input type="text" name="password" className='input' value={password} placeholder='Enter Password Here....' onChange={(e)=>{setpassword(e.target.value.trim())}}/>
                <button className='loginBtn' onClick={()=>{userLogin()}}>Login</button>
                <div>
                    <p>{errmsg ? errmsg : successmsg}</p>
                    <p>Not a member Register <Link to="/register" >Here...</Link></p>
                </div>
                
            </div>
        
    )
}


