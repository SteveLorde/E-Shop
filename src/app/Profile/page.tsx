'use client'

import {User} from "@/Data/Models/User";
import * as authservice from '@/Services/Authentication/AuthService'
import {useEffect, useState} from "react";
import AdminPanel from "@/Components/ProfileComponents/AdminPanel/AdminPanel";
import UserPanel from "@/Components/ProfileComponents/UserPanel/UserPanel";

export default function Profile() {

    const [user, setUser] = useState<User>({email: "", id: "", name: "", phonenumber: 0, username: "", usertype: "user"})

    async function GetUserInfo() {
        if (typeof localStorage !== "undefined") {
            if (localStorage.getItem("usertoken") !== "undefined") {
                let usertoset = await authservice.GetUserInfo()
                if (typeof usertoset !== "undefined") {
                    setUser(usertoset)
                }
            }
        }
    }

    useEffect(() => {
        GetUserInfo()
    }, []);

    return <>
    </>
}