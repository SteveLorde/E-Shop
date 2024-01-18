'use client'
import * as authservice from '@/Services/Authentication/AuthService'
import {AuthRequest} from '@/Data/Models/AuthRequest';
import {useState} from "react";
import styling from './styling.module.css'
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";


export default function Page() {

    const [isregisterformhidden, setRegisterVisible] = useState<boolean>(true);
    const [isloginformhidden, setLoginVisible] = useState<boolean>(false);
    const navigate = useRouter()
    const {register: loginform, handleSubmit: loginsubmit } = useForm<AuthRequest>()
    const {register: registerform, handleSubmit: registersubmit } = useForm<AuthRequest>()

    async function ToggleForm() {
        if (isregisterformhidden) {
            setRegisterVisible(false)
            setLoginVisible(true)
        }
        else {
            setRegisterVisible(true)
            setLoginVisible(false)
        }
    }

    async function Login(loginrequest : AuthRequest) {
        let check = await authservice.Login(loginrequest)
        if (check) {
            navigate.push('/Profile')
        }
    }

    async function Register(registerrequest : AuthRequest) {
        try {
            let check = await authservice.Register(registerrequest)
            if (check) {
                navigate.push('/Profile')
            }
        }
        catch (err) {
            console.log("error register: " + err)
        }
    }

    return <>
        <div className={styling.authcanvas}>
            <div className={styling.formcanvas} hidden={isloginformhidden} id='loginform' >
                <button className={styling.switchformbutton} onClick={ () => ToggleForm()}>Not Registered? click here</button>
                <h2 className={styling.formtitle}>Login</h2>
                <form className={styling.form}  onSubmit={loginsubmit(Login)}>
                    <h3 className={'inputtitle'}>Username</h3>
                    <input type="text"  {...loginform('username')} />
                    <h3 className={'inputtitle'}>Password</h3>
                    <input type="text" {...loginform('password')} />
                    <input className={styling.submitbutton} type="submit" value="Login"></input>
                </form>
            </div> 

            <div className={styling.formcanvas} hidden={isregisterformhidden} id='registerform'>
                <button className={styling.switchformbutton} onClick={ () => ToggleForm()} >Already Registered? Login</button>
                <h2 className={styling.formtitle}>Register Account</h2>
                <form className={styling.form} onSubmit={registersubmit(Register)}>
                    <h3 className={'inputtitle'}>Username</h3>
                    <input type="text" {...registerform('username')} />
                    <h3 className={'inputtitle'}>Password</h3>
                    <input type="text" {...registerform('password')} />
                    <h3 className={'inputtitle'}>Email</h3>
                    <input type="text" {...registerform('email')} />
                    <input className={styling.submitbutton} type="submit" value="Register"></input>
                </form>
            </div>
        </div>
    </>
}