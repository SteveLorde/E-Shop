'use client'
import {Product} from '@/Data/Models/Product'
import style from '@/app/Homestyle.module.css'
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import {News} from "@/Data/Models/News";
import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import Link from "next/link";
import {NewsCarousel} from "@/Components/NewsCarousel/newscarousel";

export default function Home() {
    const [mostselling24, setMostSelling] = useState<Product[]>([])




        async function GetMostSelling() {
            let mostsellings : Product[] | any = await backendservice.GetMostSelling()
            setMostSelling(mostsellings)
        }



        useEffect(() => {
            GetMostSelling()
        }, []);


        return <>
            <div className={style.homelayout}>
                {/* News Canvas */}
                <NewsCarousel />


                {/* Most Selling past 24 hours */}

                <div className={style.mostsellingcanvaas}>
                    <h3 className={style.mostsellingheader}>24Hrs Most Selling</h3>
                    <div className={style.movingcards}>
                    {mostselling24?.map((product: Product) =>
                        <Link  key={product.id} href={`/Shop/Product/${product.id}`} className={style.productcard}>
                            <img className={style.productimage} src={`${backendservice.apiurl}/storage/EShopApp/Products/${product.id}/Images/${product.images[0]}`}></img>
                            <h2 className={style.cardtext}>{product.name}</h2>
                            <h3 className={style.cardprice}>{product.price} Egp</h3>
                        </Link>
                    )}
                    </div>
                </div>
            </div>

        </>
}
