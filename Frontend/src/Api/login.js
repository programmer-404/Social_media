import axios from "axios";
import config from "../config.json";
import { getHeaders } from "../common/common";

export async function loginApi(arg) {
    let url = `${config.apiBaseUrl}/login`
    let result = await axios.post(url, arg, { headers: await getHeaders() });
    console.log("result", result);
    if (result && result.data && result.data.data && result.data.data.token) {
        sessionStorage.setItem("x-access-token", result.data.data.token)
        // sessionStorage.setItem("login", true)
    }
    return result.data
}