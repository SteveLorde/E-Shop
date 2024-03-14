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
import {PurchaseLog} from "@/Data/Models/PurchaseLog";
import cs from "classnames"

export default function CartPage() {
    const [cartitems, setCartItems] = useState<CartItem[]>([])
    const cartitemsstore = useSelector( (state : RootState) => state.cart.items)
    const [totalorder, setTotalOrder] = useState(0)
    const [importandtravelfees, setImportTravelFees] = useState(0)
    const dispatch = useDispatch();

    const [ismodalvisible, setModalVisible] = useState<boolean>(false)
    const [testcheckout, setTestCheckout] = useState<PurchaseLog>({} as PurchaseLog)


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

    //TEST
    function TestCheckout() {
        let purchaselog : PurchaseLog = {
            checkouton: new Date().getTime(), items: cartitems, totalamount: totalorder, userid: "testid"
        }
        setTestCheckout(purchaselog)
        setModalVisible(true)
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
                <div className={"border-1 m-5 gap-5 flex-wrap"}>
                    {cartitems?.map( (item : CartItem, index) =>
                        <div className={cs("d-flex flex-row flex-wrap align-items-center align-content-center m-3", styling.ProductCard)} key={index}>
                            <div className={"d-flex flex-row align-items-center justify-content-center gap-3"} >
                                <img className={styling.ProductImage} src={`${apiurl}/storage/eshopapp/Products/${item.product.id}/Images/${item.product.images[0]}`}  alt={"product_mainimage"}/>
                                <p>{item.product.name}</p>
                            </div>

                            <div className={"d-flex flex-row flex-wrap gap-4 align-content-center align-items-center"}>
                                <p>{item.product.price} EGP</p>
                                <button onClick={ () => DecreaseItem(item)}>-</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => IncreaseItem(item)}>+</button>
                            </div>
                        </div>
                    )}
                </div>
                <button className={"btn btn-sm btn-dark w-25"} onClick={() => ClearCart() }>Clear Cart</button>
            </div>

            {/* CHECKOUT SECTION*/}
            <div className={styling.checkoutsection}>
                <div>
                    <p>Import and Travel fees: +{importandtravelfees} </p>
                    <p>Total Order: {totalorder} Egp</p>
                </div>

                <div>
                    <button className={styling.checkoutbutton} onClick={() => TestCheckout()}>Checkout Test</button>
                </div>
            </div>

            <div>
                <CheckoutResultModal IsVisible={ismodalvisible} purchaselog={testcheckout} />
            </div>

        </div>
    </>
}