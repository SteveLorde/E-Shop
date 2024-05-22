'use server'

import styling from './footerstyle.module.css'


import Link from "next/link";

export default async function FooterBar() {
    return <>
        <div className={styling.footermain}>
            <p className={styling.footerrights}>all rights reserved to E-Shop</p>
        </div>
    </>
}