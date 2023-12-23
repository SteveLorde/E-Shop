'use client'


import {Product} from "@/app/Data/Models/Product";
import {useDispatch} from "react-redux";
import {AddItem, clearCart} from "@/app/Services/StateStore/CartSlice";

export default function Addbutton( {params} : { params: {product : Product} }) {
    const dispatch = useDispatch()

    function additem() {
        dispatch(AddItem(params.product))
    }

    return <>
    <button onClick={ () => additem() }>Add To Cart</button>
    </>
}