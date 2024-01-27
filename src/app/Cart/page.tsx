'use client'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/Services/StateStore/Store";
import {CartItem} from "@/Data/Models/CartItem";
import Link from "next/link";
import {useEffect, useState} from "react";
import CartSlice, {AddItem, clearCart, RemoveItem} from "@/Services/StateStore/CartSlice";
import styling from "./styling.module.css"
import {apiurl} from "@/Services/DataAPI/DataAPIService"
import {CheckoutResultModal} from "@/Components/CheckoutResultModal/CheckoutResultModal";

export default function CartPage() {
    const [cartitems, setCartItems] = useState<CartItem[]>([])
    const cartitemsstore = useSelector( (state : RootState) => state.cart.items)
    const [totalorder, setTotalOrder] = useState(0)
    const [importandtravelfees, setImportTravelFees] = useState(0)
    const dispatch = useDispatch();

    function setCart() {
        setCartItems(cartitemsstore)
    }

    function CalculateTotalOrder() {
        let totalsum : number = 0
        for (let i = 0; i < cartitems.length; i++) {
            totalsum += cartitems[i].product.price
        }
        setTotalOrder(totalsum)
    }

    async function IncreaseItem(item : CartItem) {
        dispatch(AddItem(item.product))
    }

    async function DecreaseItem(item : CartItem) {
        dispatch(RemoveItem(item.product.id))
    }

    async function ClearCart() {
        dispatch(clearCart())
    }

    useEffect(() => {
        setCart()
    }, []);

    useEffect(() => {
        CalculateTotalOrder()
    }, []);

    return <>
        <div className={styling.cartpagecanvas}>

            {/* CART SECTION*/}
            <div className={styling.cartsection}>
                <h3>Your Cart</h3>
                <div>
                    {cartitems?.map( (item : CartItem, index) =>
                        <div key={index}>
                            <div >
                                <img src={`${apiurl}/storage/Products/${item.product.id}/Images/${item.product.images[0]}`} />
                                <p>{item.product.name}</p>
                                <p>{item.quantity}</p>
                            </div>

                            <div>
                                <p onClick={ () => DecreaseItem(item)}>-</p>
                                <p>{item.quantity}</p>
                                <p onClick={() => IncreaseItem(item)}>+</p>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={() => ClearCart() }>Clear Cart</button>
            </div>

            {/* CHECKOUT SECTION*/}
            <div className={styling.checkoutsection}>
                <div>
                    <p>Import and Travel fees: +{importandtravelfees} </p>
                    <p>Total Order: {totalorder} Egp</p>
                </div>

                <div>
                    <Link href={''}>Checkout</Link>
                </div>
            </div>

            <div>
                <CheckoutResultModal />
            </div>

        </div>
    </>
}