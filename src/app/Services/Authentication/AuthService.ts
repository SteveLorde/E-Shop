import { FormRequest } from "@/app/Auth/Models/FormRequest"
import { User } from "@/app/Data/Models/User"

export let isloggedin : boolean = false
export let sessiontoken : string = ''
export let currentuser : User = {
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

export function Logout() {
    currentuser = {username: '', password: '', usertype: 'user'}
    isloggedin = false
}
