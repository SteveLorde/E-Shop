import { User } from "@/app/Data/Models/User"

export let isloggedin : boolean = false
export let sessiontoken : string = ''
export let currentuser : User = {
    username: "",
    password: "",
    usertype: "user"
}

export async function Login(){

}

export async function Register(){

}

export function Logout() {
    currentuser = {username: '', password: '', usertype: 'user'}
    isloggedin = false
}
