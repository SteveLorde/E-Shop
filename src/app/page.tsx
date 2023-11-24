'use server'
import Image from 'next/image'
import {Product} from './Data/Models/Product'
import style from '@/app/Homestyle.module.css'
import Carousel from 'react-bootstrap/Carousel';
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {News} from "@/app/Data/Models/News";

export default async function Home() {


  let newstoshow : News[] = await backendservice.GetNews()
  let mostselling24 : Product[] = await backendservice.GetMostSelling()

  async function GetMostSelling() {
    let mostsellingdata = await backendservice.GetMostSelling()
    return mostsellingdata.map((element: any) => element)
  }


  return <>

      <div>
        <h1>HOME PAGE WORKING</h1>

        {/* News Canvas */}
        <div className='style.newscanvas'>
          <Carousel>
            {newstoshow?.map ( (news : News) =>
              <Carousel.Item key={news.title}>
              <img src={`api/storage/newsimages/${news.image}`}></img>
              <Carousel.Caption>
                <h3>{news.title}</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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


      </div>

    </>
}
