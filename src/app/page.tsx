'use server'

import style from '@/app/Homestyle.module.css'
import {EventsCarousel} from "@/Components/EventsCarousel/EventsCarousel";
import {MostSellingCarousel} from "@/Components/MostSellingCarousel/MostSellingCarousel";

export default async function Home() {

        return <>
            <div className={style.homelayout}>
                {/* DiscountEvent Canvas */}
                <EventsCarousel />

                {/* Most Selling past 24 hours */}
                <MostSellingCarousel />
            </div>


        </>
}
