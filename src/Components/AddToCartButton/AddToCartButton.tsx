'use client'


import {Product} from "@/Data/Models/Product";
import {useDispatch} from "react-redux";
import {AddItem, clearCart} from "@/Services/StateStore/CartSlice";
import * as backendservice from "@/Services/DataAPI/DataAPIService"

export default function AddToCartButton({product} : {product : Product}) {
    const dispatch = useDispatch()

    let additem = () => dispatch(AddItem(product))

    return <>
    <button onClick={additem}>Add To Cart {product.name}</button>
    </>
}