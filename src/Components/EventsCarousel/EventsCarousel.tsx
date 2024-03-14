'use client'

import {useEffect, useState} from "react";
import style from "@/Components/EventsCarousel/style.module.css";
import {Carousel} from "react-bootstrap";
import {DiscountEvent} from "@/Data/Models/DiscountEvent";
import Link from "next/link";
import * as backendservice from "@/Services/DataAPI/DataAPIService";


export function EventsCarousel() {
    const [newstoshow, setNews] = useState<DiscountEvent[]>([])
    const [slideindex, setSlideIndex] = useState(0)

    function handleSlideSelect(selectedSlideIndex: any) {
        setSlideIndex(selectedSlideIndex)
    }

    async function GetNews() {
        let news : DiscountEvent[] | any = await backendservice.GetEvents()
        setNews(news)
    }
    useEffect(() => {
        GetNews()
    }, []);

    return <>
        <div className={style.carouselcanvas}>
            <Carousel className={style.carousel} activeIndex={slideindex} onSelect={handleSlideSelect}>
                {newstoshow?.map((event: DiscountEvent, index) =>
                    <Carousel.Item className={style.carouselitem} key={index}>
                        <Link href={`/Shop/Event/${event.id}`} className={style.innercarouselitem}>
                            <img className={style.newsimage}
                                 src={`${backendservice.apiurl}/storage/EShopApp/Events/${event.id}/Images/${event.image}`}/>
                            <div className={style.newstitles}>
                                <h1>{event.title}</h1>
                                <h3>{event.subtitle}</h3>
                            </div>
                        </Link>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>

    </>


}