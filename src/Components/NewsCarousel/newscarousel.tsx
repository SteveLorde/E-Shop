'use client'
import {useEffect, useState} from "react";
import styles from '@/Components/NewsCarousel/style.module.css'
import style from "@/Components/NewsCarousel/style.module.css";
import {Carousel} from "react-bootstrap";
import {News} from "@/Data/Models/News";
import Link from "next/link";
import * as backendservice from "@/Services/DataAPI/DataAPIService";


export function NewsCarousel() {
    const [newstoshow, setNews] = useState<News[]>([])
    const [slideindex, setSlideIndex] = useState(0)

    function handleSlideSelect(selectedSlideIndex: any) {
        setSlideIndex(selectedSlideIndex)
    }

    async function GetNews() {
        let news : News[] | any = await backendservice.GetNews()
        setNews(news)
    }
    useEffect(() => {
        GetNews()
    }, []);

    return <>
        <div className={style.carouselcanvas}>
            <Carousel className={style.carousel} activeIndex={slideindex} onSelect={handleSlideSelect}>
                {newstoshow?.map((news: News, index) =>
                    <Carousel.Item className={style.carouselitem} key={index}>
                        <Link href={`/Shop/${news.eventid}`} className={style.innercarouselitem}>
                            <img className={style.newsimage}
                                 src={`${backendservice.apiurl}/storage/EShopApp/News/${news.id}/Images/${news.image}`}/>
                            <div className={style.newstitles}>
                                <h1>{news.title}</h1>
                                <h3>{news.subtitle}</h3>
                            </div>
                        </Link>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>

    </>


}