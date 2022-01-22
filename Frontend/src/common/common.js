
export async function getHeaders(){
    let headers={
        "Content-Type":"application/json",
        "apiKey":"akshayApi",
        "accessToken":sessionStorage.getItem("x-access-token")
    }
    return headers
}