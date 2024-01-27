'use client'

import style from "@/Components/MostSellingCarousel/styling.module.css";
import {Product} from "@/Data/Models/Product";
import Link from "next/link";
import * as backendservice from "@/Services/DataAPI/DataAPIService";
import {useEffect, useState} from "react";

export function MostSellingCarousel() {

    const [mostselling, setMostSelling] = useState<Product[]>([])

    async function GetMostSelling() {
        let x = await backendservice.GetMostSelling();
        setMostSelling(x)
    }

    useEffect(() => {
        GetMostSelling()
    }, []);

    return <>
        <div className={style.mostsellingcanvaas}>
            <h3 className={style.mostsellingheader}>24Hrs Most Selling</h3>
            <div className={style.movingcards}>
                {mostselling?.map((product: Product) =>
                    <Link key={product.id} href={`/Shop/Product/${product.id}`} className={style.productcard}>
                        <img className={style.productimage}
                             src={`${backendservice.apiurl}/storage/EShopApp/Products/${product.id}/Images/${product.images[0]}`}></img>
                        <h2 className={style.cardtext}>{product.name}</h2>
                        <h3 className={style.cardprice}>{product.price} Egp</h3>
                    </Link>
                )}
            </div>
        </div>
    </>

}