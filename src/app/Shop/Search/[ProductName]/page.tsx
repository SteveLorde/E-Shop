'use server'

import {Product} from "@/app/Data/Models/Product";
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import Link from "next/link";

export default async function Page( {params} : {params : {ProductName: string}}) {

    let productname : string = params.ProductName
    let lookedupproducts : Product[] = await backendservice.SearchProduct(params.ProductName)

    async function NavigateToProduct(productid : string) {

    }


    return <>
        <h2>Search Results for {productname}</h2>
        <div>
            {lookedupproducts?.map( (product : Product) =>
                <Link href={`/Shop/Product/${product.productId}`} key={product.productId}>
                    <img src={ process.env.API_URL + `/News/${product.productId}/Images/${product.images[0]}`} />
                    <div>
                        { product.sellstatus > 100 && <p>most selling in {product.category}</p>}
                        <h2>{product.name}</h2>
                    </div>
                    <p>{product.price}</p>
                </Link>
            )}
        </div>
    </>
}