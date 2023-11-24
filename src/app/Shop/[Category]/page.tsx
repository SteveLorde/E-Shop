'use server'
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {Product} from "@/app/Data/Models/Product";
import Link from "next/link";


export async function Page( {params} : {params: {category : string}}) {

    const categoryproducts : Product[] = await backendservice.GetProductsOfCategory(params.category)

    return <>
        <div></div>
        <div>
            {categoryproducts?.map( (product : Product, index) =>
                <div key={index}>
                    <img src={`/api/storage/${product.id}/${product.images[0]}`} />
                    <div>
                        <h2>{product.name}</h2>
                    </div>
                    <div>
                        {product.price}
                    </div>
                </div>

            )}
        </div>
    </>
}