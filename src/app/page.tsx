'use client'
import Image from 'next/image'
import {Product} from './Data/Models/Product'
import style from '@/app/Homestyle.module.css'
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {News} from "@/app/Data/Models/News";
import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import Link from "next/link";




export default function Home() {
    const [newstoshow, setNews] = useState<News[]>([])
    const [mostselling24, setMostSelling] = useState<Product[]>([])
    const [slideindex, setSlideIndex] = useState(0)

        function handleSlideSelect(selectedSlideIndex: any) {
            setSlideIndex(selectedSlideIndex)
        }

        async function GetNews() {
            let news : News[] | any = await backendservice.GetNews()
            setNews(news)
        }

        async function GetMostSelling() {
            let mostsellings : Product[] | any = await backendservice.GetMostSelling()
            setMostSelling(mostsellings)
        }

        useEffect(() => {
            GetNews()
        }, []);

        useEffect(() => {
            GetMostSelling()
        }, []);


        /*




          let newstoshow : News[] = await backendservice.GetNews()
        let mostselling24 : Product[] = await backendservice.GetMostSelling()

        async function GetMostSelling() {
          let mostsellingdata = await backendservice.GetMostSelling()
          return mostsellingdata.map((element: any) => element)
        }
           */


        return <>
            <div className={style.homelayout}>
                {/* News Canvas */}
                <div className={style.carouselcanvas}>
                    <Carousel className={style.carousel} activeIndex={slideindex} onSelect={handleSlideSelect}>
                        {newstoshow?.map((news: News, index) =>
                            <Carousel.Item className={style.carouselitem} key={index}>
                                <div className={style.innercarouselitem}>
                                    <img className={style.newsimage} src={process.env.NEXT_PUBLIC_API_URL + `/storage/News/${news.id}/Images/${news.image}`}/>
                                    <div className={style.newstitles}>
                                        <h1>{news.title}</h1>
                                        <h3>{news.subtitle}</h3>
                                    </div>
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>


                {/* Most Selling past 24 hours */}

                <div className={style.mostsellingcanvaas}>
                    <h3 className={style.mostsellingheader}>24Hrs Most Selling</h3>
                    <div className={style.movingcards}>
                    {mostselling24?.map((product: Product) =>
                        <Link href={`/Shop/Product/${product.id}`} className={style.productcard}>
                            <img className={style.productimage} src={ process.env.NEXT_PUBLIC_API_URL + `/storage/Products/${product.id}/Images/${product.images[0]}`}></img>
                            <h2 className={style.cardtext}>{product.name}</h2>
                            <h3 className={style.cardtext}>{product.price} Egp</h3>
                        </Link>
                    )}
                    </div>
                </div>
            </div>

        </>
}
