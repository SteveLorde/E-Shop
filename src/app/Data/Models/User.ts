export interface User {
    id : string
    username : string
    name : string
    phonenumber : number
    email : string
    password : string
    usertype :  "user" | "admin"
}
