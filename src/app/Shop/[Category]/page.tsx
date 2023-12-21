'use server'
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {Product} from "@/app/Data/Models/Product";
import Link from "next/link";


export async function Page( {params} : {params: {category : string}}) {

    const productscategory = params.category
    let categoryproducts : Product[] = await backendservice.GetProductsOfCategory(productscategory)

    return <>
        <div>
            {categoryproducts?.map( (product : Product) =>
                <Link href={`/Shop/Product/${product.id}`} key={product.id}>
                    <img src={ process.env.API_URL + `/Products/${product.id}/Images/${product.images[0]}`} />
                    <div>
                        { product.sellnumber > 100 && <p>most selling in {product.category}</p>}
                        <h2>{product.name}</h2>
                    </div>
                    <p>{product.price}</p>
                </Link>
            )}
        </div>
    </>
}