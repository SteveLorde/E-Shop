'use server'
import Link from "next/link";
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {Product} from "@/app/Data/Models/Product";
import {Category, ParentCategory} from "@/app/Data/Models/Category";
import styling from "@/app/Shop/styles.module.css"
//import {useEffect, useState} from "react";

export default async function Shop() {

    console.log(process.env.NEXT_PUBLIC_API_URL)
    let parentcategories : ParentCategory[] | any = await backendservice.GetParentCategories()
    let allproducts : Product[] | any = await backendservice.GetProducts()

    return <>

    <div className={styling.shoppage}>

        <div className={"categorysidebar"}>
            <h3>Categories</h3>
            <div className={"categories"}>
                {parentcategories?.map( (parentcategory : ParentCategory) =>
                    <Link className={"categorylink"} key={parentcategory.id} href={`/Shop/${parentcategory.id}`}>{parentcategory.name}</Link>
                )}
            </div>
        </div>


        <div>

            <div className={styling.allproductsgrid}>
                {allproducts?.map( (product : Product) =>
                    <Link href={`Shop/Product/${product.id}`} className={styling.productgriditem} key={product.name}>
                        <img className={styling.productimage} src={ process.env.NEXT_PUBLIC_API_URL + `/storage/Products/${product.id}/Images/${product.images[0]}`} />
                        <h2>{product.name}</h2>
                        <div>
                            <p>{product.price}</p>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    </div>
    </>  
    
}
