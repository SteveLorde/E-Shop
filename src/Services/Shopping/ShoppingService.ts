import * as backendservice from '@/Services/DataAPI/DataAPIService'
import axios from "axios";



export async function AddToCart(productid : string) {
    try {
        let response = await axios.get(`${backendservice.apiurl}/Shopping/AddToCart/${productid}`)
        let check : Boolean = response.data
        return check

    }
    catch (err) {
        alert("error api checking item to add to cart")
    }
}