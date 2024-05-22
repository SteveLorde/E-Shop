export interface User {
    id : string
    username : string
    fullname : string
    phonenumber : number
    email : string
    usertype :  "user" | "admin"
}
