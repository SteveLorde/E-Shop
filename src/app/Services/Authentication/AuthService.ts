import { FormRequest } from "@/app/Auth/Models/FormRequest"
import { User } from "@/app/Data/Models/User"
import * as backendservice from "@/app/Services/DataAPI/DataAPIService"
import axios from "axios";

export let isloggedin : boolean = false
interface formrequest {
    username: string
    password: string
}

export async function Login(loginrequest : FormRequest){
    try {
        let response = await axios.post(`${backendservice.apiurl}/Authentication/Login`, loginrequest)
        let responsetoken = response.data
        localStorage.setItem("usertoken", responsetoken)
    }
    catch (err) {
        console.log("error login")
    }
}

export async function Register(registerrequest : formrequest){
    try {
        let response = await axios.post(`${backendservice.apiurl}/Authentication/Register`, registerrequest)
        return true
    }
    catch (err) {
        console.log("error registering")
    }
}

export async function GetUserInfo(){
    try {
        let userinfo : User = await axios.post(`${backendservice.apiurl}/Authentication/GetUserInfo`, localStorage.getItem("usertoken"))
        return userinfo
    }
    catch (err) {
        console.log("error getting user info")
    }
}

export function Logout() {
    localStorage.removeItem("usertoken")
    isloggedin = false
}
