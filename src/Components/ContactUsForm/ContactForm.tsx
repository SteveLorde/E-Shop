import {useForm} from "react-hook-form";
import {Simulate} from "react-dom/test-utils";
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import reset = Simulate.reset;
import {Mail} from "@/Data/Models/Mail";

export function ContactForm() {

    const {register: contactdata, handleSubmit: submitcontact, reset} = useForm<Mail>()

    async function SubmitMessage(formdata : Mail) {
        let message = {} as Mail
        message.email = formdata.email
        message.title = formdata.title
        message.body = formdata.body
        let check = await backendservice.SendMail(message)
        if (check) {
            reset()
        }
    }


    return <>
        <form onSubmit={submitcontact(SubmitMessage)}>
            <h1> </h1>
            <input type="text" {...contactdata('email')} />
            <h1> </h1>
            <input type="text" {...contactdata('title')} />
            <h1> </h1>
            <input type="text" {...contactdata('body')} />
            <input type="submit" />
        </form>
    </>
}