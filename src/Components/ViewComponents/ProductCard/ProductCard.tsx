'use server'

import * as backendservice from "@/Services/DataAPI/DataAPIService"
import {Product} from "@/Data/Models/Product";

export async function ProductCard({productid} : {productid : string}) {

    let product : Product = await backendservice.GetProduct(productid)

    return <>
        {/* PRODUCT CARD*/}

    </>
}