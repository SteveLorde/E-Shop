'use server'

import {User} from "@/app/Data/Models/User";
import * as authservice from '@/app/Services/Authentication/AuthService'

export default async function Profile() {

    let user : User = await authservice.GetUserInfo()

    return <>

        <div>
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

            <div>
                {/* user purchases log TO BE MADE LATER */}
                <h2>Purchases Log</h2>
                <div>

                </div>
            </div>


        </div>

    </>
}