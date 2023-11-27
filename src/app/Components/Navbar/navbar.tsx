'use client'

import styling from "@/app/Components/Navbar/styling.module.css"
import Link from "next/link"
import * as authservice from '@/app/Services/Authentication/AuthService'

import {useEffect, useState} from "react"
import {Product} from "@/app/Data/Models/Product";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/Services/StateStore/Store";


export function Navbar() {

    const [shoppingcart, SetShoppingCart] = useState<Product[]>([])
    const [AllQuantity, setCartQuantity] = useState<number>(0)
    const [authstatus, setAuthStatus] = useState<string>('Login/Register')
    const cartItems = useSelector( (state: RootState) => state.cart.items)
    const dispatch = useDispatch<AppDispatch>()
    function CheckAuthStatus() {
        if (!authservice.isloggedin) {
            setAuthStatus('Login/Register')
        } else {
            setAuthStatus('Logout')
        }
    }

    useEffect(() => {
        CheckAuthStatus()
    }, []);

    return <>
        <div className={styling.navbar}>
            <ul>
                <Link className={styling.navitem} href={'/'}>Home</Link>
                <Link className={styling.navitem} href={'/Shop'}>Shop</Link>
                <Link className={styling.navitem} href={''}>Extra</Link>
            </ul>
            <div>
                <input className={styling.searchbar} type="text" placeholder="Search product..."></input>
            </div>

            <div className={styling.cart}>
                <img className={styling.carticon} alt='' src="/Icons/shopping-cart.svg"/>
                {cartItems.length > 0 &&  <h3 className={styling.cartquantity}>{cartItems.length}</h3>}
            </div>

            <div>
                <img alt='' src={''}/>
                <Link className={styling.navitem} href={'/Authenticate'}>{authstatus}</Link>
            </div>
        </div>
    </>

}