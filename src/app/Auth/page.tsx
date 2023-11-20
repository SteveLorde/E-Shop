import * as authservice from '@/app/Services/Authentication/AuthService'
import { useState } from 'react';


export default function Auth() {


    const [isregisterformvisible, SetRegisterVisible] = useState<boolean>(true);
    const [isloginformvisible, SetLoginVisible] = useState<boolean>(false);
    
    function toggleregister() {
        SetLoginVisible(false)
        SetRegisterVisible(true)
    }

    function togglelogin() {
        SetLoginVisible(true)
        SetRegisterVisible(false)
    }


    return <>
                <div className="body">
        {isloginformvisible && <div className="loginform">
            <button onClick={ () => toggleregister() }>Not Registered? click here</button>
            <h2>Login</h2>
            <form className={'form'} onSubmit={submit1(Login)}>
                <h3 className={'inputtitle'}>Username</h3>
                <input type="text" {...loginuser("username")}/>
                <h3 className={'inputtitle'}>Password</h3>
                <input type="text"{...loginuser("password")}/>
                <button type="submit">Login</button>
            </form>
        </div> }

            {isregisterformvisible && <div className="registerform">
                <button onClick={ () => togglelogin() }>Already Registered? Login</button>
                <h2>Register Account</h2>
                <form className={'form'} onSubmit={submit2(Register)}>
                    <h3 className={'inputtitle'}>Username</h3>
                    <input type="text" {...registeruser("username")}/>
                    <h3 className={'inputtitle'}>Password</h3>
                    <input type="text"{...registeruser("password")}/>
                    <button type="submit">Register</button>
                </form>
            </div> }
            </div>
    </>
}