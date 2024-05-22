'use client'

import {useEffect, useState} from "react";
import style2 from "@/Components/EventsCarousel/style2.module.css"
import {DiscountEvent} from "@/Data/Models/DiscountEvent";
import Link from "next/link";
import * as backendservice from "@/Services/DataAPI/DataAPIService";
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Pagination} from "swiper/modules";
import 'swiper/swiper-bundle.css';




export function EventsCarousel() {
    const [eventsToShow, setEventsToShow] = useState<DiscountEvent[]>([])

    async function GetNews() {
        let news : DiscountEvent[] | any = await backendservice.GetEvents()
        setEventsToShow(news)
    }
    useEffect(() => {
        GetNews()
    }, []);

    return <>
        <div className={style2.container}>
            <Swiper className={style2.container_carousel} modules={[Navigation, Pagination]} navigation={false} pagination={{type: "bullets", clickable: true}}>
                {eventsToShow.map((event, index) => (
                    <SwiperSlide className={style2.container_carousel_slide} key={event.id}>
                        <div>
                            <img className={style2.image} src={`${backendservice.apiurl}/storage/EShopApp/Events/${event.id}/Images/${event.image}`} alt={event.title}/>
                            <div className={style2.container_carousel_slide_text}>
                                <h2 className={style2.title}>{event.title}</h2>
                                <p className={style2.subtitle}>{event.subtitle}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </>


}

/*
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
 */