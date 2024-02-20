'use server'

import {Product} from "@/Data/Models/Product";
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import Link from "next/link";

export default async function Page( {params} : {params : {productname: string}}) {

    let productname : string = params.productname
    let lookedupproducts : Product[] | any = await backendservice.SearchProduct(params.productname)

    async function NavigateToProduct(productid : string) {

    }


    return <>
        <h2>Search Results for {productname}</h2>
        <div>
            {lookedupproducts?.map( (product : Product) =>
                <Link href={`/Shop/Product/${product.id}`} key={product.id}>
                    <img src={ process.env.API_URL + `/News/${product.id}/Images/${product.images[0]}`} />
                    <div>
                        { product.sellnumber > 100 && <p>most selling in {product.subCategory.name}</p>}
                        <h2>{product.name}</h2>
                    </div>
                    <p>{product.price}</p>
                </Link>
            )}
        </div>
    </>
}