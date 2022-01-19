import axios from "axios";
import config from "../config.json";

export async function loginApi(arg){
    let url=`${config.apiBaseUrl}/login`
    let result = await axios.post(url,arg);
    console.log("result",result);
    return result.data
}