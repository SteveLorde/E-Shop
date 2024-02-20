'use client'

import styling from "@/Components/Navbar/navbarstyling.module.css"
import Link from "next/link"
import * as authservice from '@/Services/Authentication/AuthService'

import {useEffect, useState} from "react"
import {Product} from "@/Data/Models/Product";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/Services/StateStore/Store";
import { useRouter } from 'next/navigation'
import {apiurl} from "@/Services/DataAPI/DataAPIService";




export function Navbar() {
    const router = useRouter()
    const [shoppingcart, SetShoppingCart] = useState<Product[]>([])
    const [AllQuantity, setCartQuantity] = useState<number>(0)
    const [authstatus, setAuthStatus] = useState<string>('')
    const [searchinput, SetSearchInput] = useState<string>("Search for product... ")
    const cartItems = useSelector( (state: RootState) => state.cart.items)
    const dispatch = useDispatch<AppDispatch>()

    function handleinputchange(e : any) {
        SetSearchInput(e.target.value)
    }
    function CheckAuthStatus() {
        if (authservice.CheckLoggedIn()) {
            setAuthStatus(authservice.CheckLoggedUsername())
        }
        else {
            setAuthStatus("Login / Register")
        }
    }

    function SearchProduct() {
        router.push(`/Shop/Search/${searchinput}`)
    }

    useEffect(() => {
        CheckAuthStatus()
    }, []);

    return <>
        <div className={styling.navbar}>
            <ul className={styling.links}>
                <Link className={styling.navitem} href={'/'}>Home</Link>
                <Link className={styling.navitem} href={'/Shop'}>Shop</Link>
                <Link className={styling.navitem} href={'/Contact'}>Contact</Link>
            </ul>

            <div className={styling.searchbar}>
                <input className={styling.searchinput}  type="text" value={searchinput} onChange={handleinputchange}>
                </input>
                <img className={styling.searchicon} src="/Icons/magnifyglass.png" onClick={SearchProduct} />
            </div>

            <Link href={'/Cart'} className={styling.cart}>
                <img className={styling.carticon} alt='' src="/Icons/shopping-cart.svg"/>
                {cartItems.length > 0 &&  <h3 className={styling.cartquantity}>{cartItems.length}</h3>}
            </Link>

            <div className={"d-flex p-2 w-auto rounded-5 bg-secondary"}>
                {authservice.loggedinuser != undefined && <img alt='' src={`${apiurl}/storage/EShopApp/Users/${authservice.loggedinuser.id}/Images/${authservice.loggedinuser}`}/>}
                <Link className={styling.authbutton} href={'/Auth'}>{authstatus}</Link>
            </div>
        </div>
    </>

}