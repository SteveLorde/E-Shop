import { FormRequest } from "@/app/Auth/Models/FormRequest"
import { User } from "@/app/Data/Models/User"
import axios from "axios";

export let isloggedin : boolean = false
export let sessiontoken : string = ''
export let currentuser : User = {
    email: "", id: "", name: "", phonenumber: 0,
    username: "",
    password: "",
    usertype: "user"
}

interface formrequest {
    username: string
    password: string
}

export async function Login(loginrequest : FormRequest){
    let check = await fetch('http')
    return check
}

export async function Register(formrequest : formrequest){
    let checkregister = await fetch('')
    return true
}

interface userinforequest {
    user : User
    token : string
}

export async function GetUserInfo(){
    let inforequest : userinforequest
    inforequest = {
        user: currentuser,
        token: sessiontoken
    }
    let userinfo : User = await axios.put(`http://localhost:5171/Authentication/GetUserInfo`, inforequest)
    return userinfo
}



export function Logout() {
    currentuser = {email: "", id: "", name: "", phonenumber: 0, username: '', password: '', usertype: 'user'}
    isloggedin = false
}
