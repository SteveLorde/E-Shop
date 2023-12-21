'use server'
import Link from "next/link";
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {Product} from "@/app/Data/Models/Product";
//import {useEffect, useState} from "react";

export default async function Shop() {

    console.log(process.env.NEXT_PUBLIC_API_URL)
    let categories : string[] | any = await backendservice.GetParentCategories()
    let allproducts : Product[] | any = await backendservice.GetProducts()

    return <>
    <div>
        <h1>TEST SHOP PAGE</h1>
        <div className={'categories'}>
            {categories?.map( (category : string) => 
                <Link key={category} href={`Shop/${category}`}>{category}</Link>
            )}
        </div>

        <div>

            <div>
                {allproducts?.map( (product : Product) =>
                    <div key={product.name}>
                        <img />
                        <h2>{product.name}</h2>
                        <div>
                            <p>{product.price}</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    </div>
    </>  
    
}
