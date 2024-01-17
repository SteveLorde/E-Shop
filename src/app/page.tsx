'use client'
import {Product} from '@/Data/Models/Product'
import style from '@/app/Homestyle.module.css'
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import {Event} from "@/Data/Models/Event";
import {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";
import Link from "next/link";
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
