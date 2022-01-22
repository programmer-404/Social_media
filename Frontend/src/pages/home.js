import React, { useEffect } from 'react'
import { userDetailApi } from '../Api/userDetail';

export default function Home() {
    useEffect(() => {
      
    async function fetchData(){
        let result= await userDetailApi({username:"akshay"})
        console.log("hereee result",result)
    }
    
    fetchData()
    }, []);
    
    return (
        <div>
            <h1>home page</h1>
        </div>
    )
}


