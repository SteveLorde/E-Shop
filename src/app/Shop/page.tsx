'use server'

import Link from "next/link";
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import {Product} from "@/Data/Models/Product";
import {SubCategory, MainCategory} from "@/Data/Models/Category";
import styling from "@/app/Shop/styles.module.css"
//import {useEffect, useState} from "react";

export default async function Shop() {
    let parentcategories : MainCategory[] | any = await backendservice.GetParentCategories()
    let allproducts : Product[] | any = await backendservice.GetProducts()

    return <>

    <div className={styling.shoppage}>

        <div className={"categorysidebar"}>
            <h3>Categories</h3>
            <div className={"categories"}>
                {parentcategories?.map( (parentcategory : MainCategory) =>
                    <Link className={"categorylink"} key={parentcategory.id} href={`/Shop/${parentcategory.id}`}>{parentcategory.name}</Link>
                )}
            </div>
        </div>


        <div>

            <div className={styling.allproductsgrid}>
                {allproducts?.map( (product : Product) =>
                    <Link href={`Shop/Product/${product.id}`} className={styling.productcard} key={product.name}>
                        <img className={styling.productimage} src={`${backendservice.apiurl}/storage/EShopApp/Products/${product.id}/Images/${product.images[0]}`} />
                        <h2>{product.name}</h2>
                        {product.quantity > 0 && <p className={"productstocked"}>in stock</p>}
                        <div className={"flex flex-row items-center gap-2"}>
                            <p className={styling.productprice}>{product.price}</p>
                            <p className={styling.priceCurrency}>EGP</p>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    </div>

    </>  
    
}
