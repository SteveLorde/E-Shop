import { AuthRequest } from "@/Data/Models/AuthRequest"
import { User } from "@/Data/Models/User"
import * as backendservice from "@/Services/DataAPI/DataAPIService"
import axios from "axios";

let isloggedin = false
let loggedusername = "Login / Register"
export let loggedinuser : User = {} as User


export async function Login(loginrequest : AuthRequest){
    try {
        let response = await axios.post(`${backendservice.apiurl}/eshop/authentication/login`, loginrequest)
        localStorage.setItem('usertoken', response.data)
        return true
    }
    catch (err) {
        console.log("error login: " + err)
    }
}

export async function Register(registerrequest : AuthRequest){
    try {
        let response = await axios.post(`${backendservice.apiurl}/eshop/authentication/register`, registerrequest)
        return true
    }
    catch (err) {
        console.log("error registering: " + err)
    }
}

export async function GetUserInfo(){
    try {
        let axiosapi = axios.create()
        axiosapi.interceptors.request.use(
            (config : any) =>  {
                const token = localStorage.getItem("usertoken")
                const clonedReq = {
                    ...config,
                    headers: {
                        ...config.headers,
                        Authorization: `Bearer ${token}`,
                    },
                };
                return clonedReq;
            },
            (error) => {
                // Handle request error
                return Promise.reject(error);
            }
        )
        let userinfo =  await axiosapi.get<User>(`${backendservice.apiurl}/Authentication/GetUserInfo` ).then( res => res.data)
        loggedusername = userinfo.name
        isloggedin = true
        loggedinuser = userinfo
        return userinfo
    }
    catch (err) {
        console.log("error getting user info " + err)
    }
}

export function CheckLoggedUsername() {
    return loggedusername
}

export function CheckLoggedIn() {
    return isloggedin
}

export function Logout() {
    localStorage.removeItem("usertoken")
    isloggedin = false
    loggedusername = "Login / Register"
}
