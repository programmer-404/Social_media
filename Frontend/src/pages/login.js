import React from 'react'
import { useState } from 'react'
import { loginApi } from '../Api/login';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form"

export default function Login() {
    
    const [errmsg, seterrmsg] = useState("")
    const [successmsg, setsuccessmsg] = useState("")
    const {register,handleSubmit,formState: {errors}}= useForm()
    const userLogin=async (e)=>{
        
        console.log(errors);
        console.log("Form Data",e);
        
        if(!e.username || !e.password ){
            seterrmsg("Please Enter Credentials");
            return false
        }
        let request = { username:e.username,password:e.password };
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
                <form  className='loginForm' onSubmit={handleSubmit(userLogin)}> 
                <label htmlFor="username" className='label'>Username</label>
                <input type="text" {...register('username',{required:true})} className='input' placeholder='Enter Username Here....'  />
                {errors.username && <p className='err_msg'>Username is required</p>}
                <label htmlFor="password" className='label'>Password</label>
                <input type="password" {...register("password", {required:true})} className='input' placeholder='Enter Password Here....' />
                {errors.password && <p className='err_msg'>Password is required</p>}
                <input className='loginBtn' type="submit" value="Login"/>
                </form>
                <div>
                    <p>{errmsg ? errmsg : successmsg}</p>
                    <p className='linker'>Not a member Register <Link to="/register" >Here...</Link></p>
                </div>
                
            </div>
        
    )
}


