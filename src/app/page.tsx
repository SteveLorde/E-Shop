'use client'
import Image from 'next/image'
import {Product} from './Data/Models/Product'
import style from '@/app/Homestyle.module.css'
import Carousel from 'react-bootstrap/Carousel';
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {News} from "@/app/Data/Models/News";

import {useEffect, useState} from "react";

export default function Home() {

    const [newstoshow, setNews] = useState<News[]>([])
    const [mostselling24, setMostSelling] = useState<Product[]>([])
    const [slideindex, setSlideIndex] = useState(0)

    function handleSlideSelect(selectedSlideIndex : any) {
        setSlideIndex(selectedSlideIndex)
    }

    async function GetNews() {
        let news = await backendservice.GetNews()
        setNews(news)
    }

    async function GetMostSelling() {
        let mostsellings = await backendservice.GetMostSelling()
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
        <h1>HOME PAGE WORKING</h1>

        {/* News Canvas */}
        <div className='style.newscanvas'>
          <Carousel className={style.carousel} activeIndex={slideindex} onSelect={handleSlideSelect}>
              {newstoshow?.map( (news : News , index) =>
                      <Carousel.Item key={index}>
                          <img src={`api/storage/newsimages/${news.image}`}></img>
                          <Carousel.Caption className={style.carouselcaption}>
                              <h1 className={style.carouseltitlecaption}>{news.title}</h1>
                              <p>{news.subtitle}</p>
                          </Carousel.Caption>
                      </Carousel.Item>
              )}
          </Carousel>
        </div>

        {/* Most Selling past 24 hours */}
        <div>
          {mostselling24?.map( (product : Product) =>
            <div key={product.id} className={style.productcard}>
              <Image src={`/api/storage/${product.id}/${product.images[0]}`} alt={''}></Image>
              <h2>{product.name}</h2>
              <h3>Price: {product.price}</h3>
            </div>
          )}
        </div>
    </>
}
