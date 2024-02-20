import * as backendservice from '@/Services/DataAPI/DataAPIService'
import axios from "axios";
import {store} from "@/Services/StateStore/Store"
import {forEach} from "react-bootstrap/ElementChildren";
import {PurchaseLog} from "@/Data/Models/PurchaseLog";



export async function AddToCart(productid : string) {
    try {
        let response = await axios.get(`${backendservice.apiurl}/eshopapp/shopping/AddToCart/${productid}`)
        let check : Boolean = response.data
        return check

    }
    catch (err) {
        alert("error api checking item to add to cart")
    }
}

export async function Checkout(totalamount : number) {

    let cartitems = store.getState().cart.items
    let checkoutreceipt : PurchaseLog = {checkouton: new Date().getTime(), items: cartitems, totalamount: totalamount, userid: ""}
    let axiosapi = axios.create()
    axiosapi.interceptors.request.use(
        (config : any) =>  {
            const token = localStorage.getItem("usertoken")
            const clonedReq = {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
            return clonedReq;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    )
    let response = await axiosapi.post(`${backendservice.apiurl}/eshop/shopping/checkout`, checkoutreceipt)
    let check = response.data
    if (check) {
        return checkoutreceipt
    }
}