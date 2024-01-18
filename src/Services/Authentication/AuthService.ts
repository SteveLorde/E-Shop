import { AuthRequest } from "@/Data/Models/AuthRequest"
import { User } from "@/Data/Models/User"
import * as backendservice from "@/Services/DataAPI/DataAPIService"
import axios from "axios";

export async function Login(loginrequest : AuthRequest){
    try {
        let response = await axios.post(`${backendservice.apiurl}/eshop/authentication/login`, loginrequest)
        if (response.data != null || "") {
            let responsetoken : string = response.data
            localStorage.setItem("usertoken", responsetoken)
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        console.log("error login: " + err)
    }
}

export async function Register(registerrequest : AuthRequest){
    try {
        let response = await axios.post(`${backendservice.apiurl}/eshop/authentication/register`, registerrequest)
        if (response.data != false || "" || null) {
            localStorage.setItem('usertoken' , response.data)
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        console.log("error registering: " + err)
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
}
