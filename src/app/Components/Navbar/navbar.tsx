'use client'

import styling from "@/app/Components/Navbar/styling.module.css"
import Link from "next/link"

import { useState } from "react"
import {Product} from "@/app/Data/Models/Product";


export function Navbar() {

    const [shoppingcart, SetShoppingCart] = useState<Product[]>([])

    return (
        <div className={styling.navbar}>
            <ul>
                <Link className={styling.navitem} href={'/'}>Home</Link>
                <Link className={styling.navitem} href={'/Shop'}>Shop</Link>
                <Link className={styling.navitem} href={''}>Extra</Link>
            </ul>
            <div>
                <input className={styling.searchbar} type="text" placeholder="Search product..."></input>
            </div>

            <div>
                <img />
            </div>

            <div>
                <img src={''} />
                <Link className={styling.navitem} href={'/Authenticate'}>Login/Register</Link>
            </div>
        </div>
    )
}