'use server'

import style from '@/app/Homestyle.module.css'
import {NewsCarousel} from "@/Components/NewsCarousel/newscarousel";
import {MostSellingCarousel} from "@/Components/MostSellingCarousel/MostSellingCarousel";

export default function Home() {

        return <>
            <div className={style.homelayout}>
                {/* Event Canvas */}
                <NewsCarousel />

                {/* Most Selling past 24 hours */}
                <MostSellingCarousel />
            </div>


        </>
}
