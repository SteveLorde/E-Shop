'use client'


import {Product} from "@/Data/Models/Product";
import {useDispatch} from "react-redux";
import {AddItem, clearCart} from "@/Services/StateStore/CartSlice";
import * as backendservice from "@/Services/DataAPI/DataAPIService"

export default function AddToCartButton({product} : {product : Product}) {
    const dispatch = useDispatch()

    let additem = () => dispatch(AddItem(product))

    return <>
    <button className={"p-3 bg-success border-0 rounded-5"} onClick={additem}>Add To Cart {product.name}</button>
    </>
}