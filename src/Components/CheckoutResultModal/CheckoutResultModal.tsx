'use client'
import {PurchaseLog} from "@/Data/Models/PurchaseLog";
import {Product} from "@/Data/Models/Product";
import {CartItem} from "@/Data/Models/CartItem";
import {useEffect, useState} from "react";
import {isVisible} from "dom-helpers";
import Link from "next/link";

export function CheckoutResultModal({IsVisible ,purchaselog} : {IsVisible : boolean,purchaselog : PurchaseLog}) {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const closemodal = () => IsVisible = false

    useEffect(() => {
        let isToken = localStorage.getItem('usertoken')
        if (isToken !== 'undefined') {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [IsVisible]);

    return <>

            {IsVisible && isLoggedIn && <div>
                <p>num of items {purchaselog.items.length}</p>
                {purchaselog.items.map((product: CartItem) =>
                    <div key={product.product.id}>
                        <p>name: {product.product.name}</p>
                        <p>quantity: {product.quantity}</p>
                    </div>
                )}
                <p>total price {purchaselog.totalamount} egp</p>
                <button onClick={closemodal}>Close</button>
            </div>
            }

            {IsVisible && !isLoggedIn && <div>
                <h3>Please Login To Checkout</h3>
                <Link href={"/Auth"}>Login</Link>
            </div>}


    </>
}