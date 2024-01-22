'use client'

import * as backendservice from "@/Services/DataAPI/DataAPIService"
import {Product} from "@/Data/Models/Product";
import styling from "@/app/Shop/[parentcategoryid]/styling.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";

export function Page({params} : {params : {discounteventid: string}}) {

    const [eventproducts, setEventProducts] = useState<Product[]>([])

    async function GetEventProducts() {
        let evenprods : Product[] = await backendservice.GetEventProducts(params.discounteventid)
        setEventProducts(evenprods)
    }

    useEffect(() => {
        GetEventProducts()
    }, []);

    return <>
        <div className={styling.productscanvas}>
            {eventproducts?.map((product: Product) =>
                <Link className={styling.productcard} href={`/Shop/Product/${product.id}`} key={product.id}>
                    <img className={styling.productimage}
                         src={`${backendservice.apiurl}/storage/Products/${product.id}/Images/${product.images[0]}`}/>
                    <div className={styling.productinfo}>
                        {product.sellnumber > 100 &&
                            <p>most selling in {product.category.parentCategory.name} in {product.category.name}</p>}
                        <h2>{product.name}</h2>
                        {product.quantityavailable > 0 && <p className={"productstocked"}>in stock</p>}
                    </div>
                    <p className={styling.productprice}>{product.price} egp</p>
                </Link>
            )}
        </div>
    </>
}