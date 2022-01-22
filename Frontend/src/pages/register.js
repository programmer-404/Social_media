import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import registerApi from "../Api/register"
import { useForm } from "react-hook-form"

export default function Register() {
    const [errmsg, seterrmsg] = useState("");
    const [successmsg, setsuccessmsg] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    const userRegister = async (e) => {
        console.log(e);
        let request = e
        let result = await registerApi(request);
        if (!result || !result.status) {
            seterrmsg(result.data.message)
            setsuccessmsg("")
        } else {
            seterrmsg("")
            setsuccessmsg(result.data.message)
        }
        console.log("resultt", result)


    }
    return (
        <div className="box-container-register">
            <div className='siteName'>Socio</div>
            <form className='loginForm' onSubmit={handleSubmit(userRegister)}>

                <input type="file" name="profileImg" {...register("profileImg")} />

                <label htmlFor="username" className='label'>Username</label>
                <input type="text" {...register('username', { required: true })} className='input' placeholder='Enter Username Here....' />
                {errors.username && <p className='err_msg'>Username is required</p>}

                <label htmlFor="password" className='label'>Password</label>
                <input type="password" {...register("password", { required: true })} className='input' placeholder='Enter Password Here....' />
                {errors.password && <p className='err_msg'>Password is required</p>}

                <label htmlFor="fname" className='label'>First Name</label>
                <input type="text" {...register("fname")} className='input' placeholder='example' />

                <label htmlFor="lname" className='label'>Last Name</label>
                <input type="text" {...register("lname")} className='input' placeholder='Dolby' />

                <label htmlFor="email" className='label'>Email</label>
                <input type="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ })} className='input' placeholder='abc@example.com' />
                {errors.email && <p className='err_msg'>Email is required</p>}
                {errors.email?.type == "pattern" && <p className='err_msg'>Please Enter Valid Email Id</p>}

                <label htmlFor="mobileNo" className='label'>Mobile Number</label>
                <input type="tel" {...register("mobile_no", { required: true, pattern: /^[789]\d{9}$/ })} className='input' placeholder="0000000000" />
                {errors.mobile_no?.type == "pattern" && <p className='err_msg'>Please Enter Valid Mobile Number</p>}
                {errors.mobile_no && errors.mobile_no?.type !== "pattern" && <p className='err_msg'>Mobile Number is required</p>}

                <input className='registerBtn' type="submit" value="Register" />

            </form>
            <div>
                {(errmsg) ? <p className='form_err'>{errmsg}</p> : null}
                {successmsg ? <p className='success_msg'>{successmsg}</p> : null}
                <p className='linker'>Already a member Login <Link to="/login" >Here...</Link></p>
            </div>
        </div>
    )
}
