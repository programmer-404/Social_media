import axios from "axios";
import config from "../config.json";

export default async function registerApi(arg){
    let url=`${config.apiBaseUrl}/register`
    let result = await axios.post(url,arg);
    console.log("result",result);
    return result.data
}