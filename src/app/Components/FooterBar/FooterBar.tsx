'use client'


import Link from "next/link";

export default function FooterBar() {



    return <>
        <div>
            <img />
            <div>
                <li>E-Shop is a LLC shopping company</li>
                <li></li>
            </div>
        </div>

        <div>
            
            <div>
                <h2>Email Us</h2>
                <Link href={'/email'}></Link>
            </div>
        </div>
    </>
}