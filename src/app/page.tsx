import Image from 'next/image'
import { Product } from './Data/Models/Product'
import { NewsCarousel } from './Components/NewsCarousel/newscarousel'
import style from '@/app/Homestyle.module.css'
import Carousel from 'react-bootstrap/Carousel';
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {News} from "@/app/Data/Models/News";

export default async function Home() {


  let newstoshow : News[] = await backendservice.GetNews()


  return <>

      <div>

        {/* News Canvas */}
        <div className='style.newscanvas'>
          <Carousel>
            {newstoshow?.map ( (news : News) =>
              <Carousel.Item>
              <img src=''></img>
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
          <>
            <div className={style.productcard}>
              <Image src={''} alt={''}>{product.thumbnail}</Image>
              <h2>{product.name}</h2>
              <h3>Price: {product.price}</h3>
            </div>
          </>
          )}
        </div>


      </div>

    </>
}
