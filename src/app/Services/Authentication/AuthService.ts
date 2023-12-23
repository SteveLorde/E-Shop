import { AuthRequest } from "@/app/Auth/Models/AuthRequest"
import { User } from "@/app/Data/Models/User"
import * as backendservice from "@/app/Services/DataAPI/DataAPIService"
import axios from "axios";

export let isloggedin : boolean = false
interface formrequest {
    username: string
    password: string
}

export async function Login(loginrequest : AuthRequest){
    try {
        let response = await axios.post(`${backendservice.apiurl}/Authentication/Login`, loginrequest)
        let responsetoken = response.data
        localStorage.setItem("usertoken", responsetoken)
    }
    catch (err) {
        console.log("error login")
    }
}

export async function LoginTest(loginrequest : any){
    try {
        let response = await axios.post(`${backendservice.apiurl}/Authentication/LoginTest`, loginrequest)
        let responsetoken = response.data
        localStorage.setItem("usertoken", responsetoken)
        return true
    }
    catch (err) {
        console.log("error login test")
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
        let usertoken = localStorage.getItem("usertoken")
        let response = await axios.post(`${backendservice.apiurl}/Authentication/GetUserInfo`, usertoken )
        let userinfo : User = response.data
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
