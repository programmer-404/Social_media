import axios from "axios";
import config from "../config.json";
import { getHeaders } from "../common/common";

export async function userDetailApi(arg){
    let url=`${config.apiBaseUrl}/userDetail`
    let result = await axios.post(url,arg,{headers:await getHeaders()});
    
    return result.data
}