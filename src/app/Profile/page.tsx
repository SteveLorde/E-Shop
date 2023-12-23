'use client'

import {User} from "@/app/Data/Models/User";
import * as authservice from '@/app/Services/Authentication/AuthService'
import {useEffect, useState} from "react";
import AddProductForm from "@/app/Profile/Components/AddProductForm/AddProductForm";
import AdminPanel from "@/app/Profile/Components/AdminPanel/AdminPanel";
import UserPanel from "@/app/Profile/Components/UserPanel/UserPanel";

export default function Profile() {

    const [user, setUser] = useState<User>()

    async function GetUserInfo() {
        let usertoset = await authservice.GetUserInfo()
        setUser(usertoset)
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
                <AdminPanel />
            </div>
            }

            {user?.usertype == "user" && <div>
                <UserPanel />
            </div>}

        </div>

    </>
}