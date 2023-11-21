'use server'
import * as authservice from '@/app/Services/Authentication/AuthService'
import { FormRequest } from './Models/FormRequest';


export async function AuthLanding() {


    let formrequest : FormRequest


    function ToggleForm() {
        document.getElementById('registerform')
    }

    async function Login(FormData : FormData) {
        formrequest.username = FormData.get('username') as string
        formrequest.password = FormData.get('password') as string
        console.log("checking form login request" + formrequest)
        let check = await authservice.Login(formrequest)
        if (check) {

        }
    }

    async function Register(FormData : FormData) {
        formrequest.username = FormData.get('username') as string
        formrequest.password = FormData.get('password') as string
        console.log("checking form register request" + formrequest)
        let check = await authservice.Register(formrequest)
        if (check) {
            let checklogin = await authservice.Login(formrequest)
            if (checklogin) { }
        }
        else {
            console.log("error register")
        }
    }



    return <>
            <div id='loginform' className="loginform">
                <button>Not Registered? click here</button>
                <h2>Login</h2>
                <form className={'form'} action={Login}>
                    <h3 className={'inputtitle'}>Username</h3>
                    <input type="text" name='username'/>
                    <h3 className={'inputtitle'}>Password</h3>
                    <input type="text" name='password'/>
                    <button type="submit">Login</button>
                </form>
            </div> 

            <div id='registerform' className="registerform">
                <button >Already Registered? Login</button>
                <h2>Register Account</h2>
                <form className={'form'} action={Register}>
                    <h3 className={'inputtitle'}>Username</h3>
                    <input type="text" />
                    <h3 className={'inputtitle'}>Password</h3>
                    <input type="text" />
                    <button type="submit">Register</button>
                </form>
            </div>
    </>
}