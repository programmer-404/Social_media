import axios from "axios";
import config from "../config.json";
import { getHeaders } from "../common/common";

export default async function registerApi(arg){
    let url=`${config.apiBaseUrl}/register`
    let result = await axios.post(url,arg,{headers:await getHeaders()});
    console.log("result",result);
    return result.data
}