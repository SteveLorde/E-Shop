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
import {MainCategory} from "@/Data/Models/Category";
import {GetParentCategories} from "@/Services/DataAPI/DataAPIService"




export function Navbar() {
    const router = useRouter()
    const [categories, setCategories] = useState<MainCategory[]>([])
    const [shoppingcart, SetShoppingCart] = useState<Product[]>([])
    const [AllQuantity, setCartQuantity] = useState<number>(0)
    const [authstatus, setAuthStatus] = useState<string>('')
    const [searchinput, SetSearchInput] = useState<string>("")
    const cartItems = useSelector( (state: RootState) => state.cart.items)
    const dispatch = useDispatch<AppDispatch>()
    const [hoverIndex, setHoverIndex] = useState<number>(-1)

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

    async function GetCategories() {
        const mainCategories = await GetParentCategories()
        setCategories(mainCategories)
    }

    function ShowCategoryMenu(indexNumber : number) {
        setHoverIndex(indexNumber)
    }

    function CloseCategoryMenu() {
        setTimeout(() => setHoverIndex(-1), 500)
    }

    useEffect(() => {
        GetCategories()
        CheckAuthStatus()
    }, []);

    return <>
        <nav className="block sm:hidden">
            <div className="flex flex-row items-center">
                <img className={styling.togglemobilemenu}/>
                <h2>E-Shop</h2>
            </div>

            <div className={styling.mobilemenulist}>
            <Link className={styling.navlink} href={'/'}>Home</Link>
                <Link className={styling.navlink} href={'/Shop'}>Shop</Link>
                <Link className={styling.navlink} href={'/Contact'}>Contact</Link>
            </div>
        </nav>

        <nav className={styling.navbar}>
            <div className={styling.navbarMain}>
                <Link className={styling.navbarMainLogo} href={"/"}>E-Shop</Link>
                <div className={styling.searchbar}>
                    <input className={styling.searchinput} type="text" placeholder={"search for product..."} value={searchinput} onChange={handleinputchange}></input>
                    <img className={styling.searchicon} src="/Icons/magnifyglass.svg" alt={"search"} onClick={SearchProduct}/>
                </div>
            </div>

            <div className={"flex flex-row items-center gap-8"}>
                <Link href={'/Cart'} className={styling.cart}>
                    <img className={styling.navicon} alt='cart' src="/Icons/shopping-cart.svg"/>
                    {cartItems.length > 0 && <h3 className={styling.cartquantity}>{cartItems.length}</h3>}
                </Link>
                <Link className={styling.authbutton} href={'/Auth'}>
                    <img className={styling.navicon} src="/Icons/ProfileNavIcon.svg" alt={"profile"}/>
                </Link>
            </div>
        </nav>

        <div className={styling.subnavbar}>
            <div className={"flex flex-row items-center gap-12"}>
                <Link className={styling.subNavBarBrowseLink} href={"/Shop"}>Browse</Link>
                {categories?.map((category,index) =>
                    <div className={styling.categoryContainer} key={category.id}>
                        <Link className={styling.subNavBarLink} key={category.id} href={`/Shop/${category.id}`} onMouseEnter={() => ShowCategoryMenu(index)} onMouseLeave={() => CloseCategoryMenu()}>{category.name}</Link>
                        {hoverIndex === index ? <div className={styling.subNavbarCategoryMenu} onMouseEnter={() => ShowCategoryMenu(index)} onMouseLeave={() => CloseCategoryMenu()}>
                            {category.subCategories?.map(subcategory =>
                                <Link className={styling.categoryMenuLink}
                                      href={`/Shop/${category.id}/${subcategory.id}`}
                                      key={subcategory.id}>{subcategory.name}</Link>
                            )}
                        </div> : null}
                    </div>
                )}
            </div>
        </div>

    </>

}

//   {authservice.loggedinuser != undefined && <img alt='' src={`${apiurl}/storage/EShopApp/Users/${authservice.loggedinuser.id}/Images/${authservice.loggedinuser}`}/>}
/*
            <ul className={styling.links}>
                <Link className={styling.navlink} href={'/'}>Home</Link>
                <Link className={styling.navlink} href={'/Shop'}>Shop</Link>
                <Link className={styling.navlink} href={'/Contact'}>Contact</Link>
            </ul>
 */