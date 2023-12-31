'use client'

import {User} from "@/Data/Models/User";
import * as authservice from '@/Services/Authentication/AuthService'
import {useEffect, useState} from "react";
import AdminPanel from "@/Components/AdminPanel/AdminPanel";
import UserPanel from "@/Components/UserPanel/UserPanel";

export default function Profile() {

    const [user, setUser] = useState<User>({email: "", id: "", name: "", password: "", phonenumber: 0, username: "", usertype: "user"})

    async function GetUserInfo() {
        if (localStorage.getItem("usertoken") != null || "") {
            let usertoset = await authservice.GetUserInfo()
            if (usertoset != undefined) {
                setUser(usertoset)
            }
        }
    }

    useEffect(() => {
        GetUserInfo()
    }, []);

    return <>

        <div>
            {/* USER INFO */}
            <h2>Personal Info</h2>
            <div>
                <p>Username: {user.username}</p>
                <p>Name: {user.name}</p>
                <div>
                    <p>Password: {user.password}</p>
                    <button>Change Password</button>
                </div>
                <p>Phone Number: {user.phonenumber}</p>
                <p>Email: {user.email}</p>
            </div>

            {user?.usertype == "admin" && <div>
                <AdminPanel params={ {adminid: user.id} } />
            </div>
            }

            {user?.usertype == "user" && <div>
                <UserPanel props={ {userid: user.id}} />
            </div>}

        </div>

    </>
}