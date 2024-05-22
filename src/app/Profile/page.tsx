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
                if (usertoset != undefined) {
                    setUser(usertoset)
                }
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
                <p>Name: {user.fullname}</p>
                <div>
                    <p>Password: xxxxxx</p>
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