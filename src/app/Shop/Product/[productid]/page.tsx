'use server'

import {Product} from "@/Data/Models/Product"
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import styling from './styling.module.css'
import Addbutton from './AddToCartButton'


export default async function Product({params} : {params: {productid : string}}) {

    let product = await backendservice.GetProduct(params.productid)
    let mainimage : any = product?.images[0]

    async function ChangeImage(image : string) {

    }

    async function OnInitMainImage() {

    }

    OnInitMainImage()

    return <>
        <div className={styling.productpagecanvas}>
            {/* IMAGE*/}
            <div className={styling.productgallery} >
                <img className={styling.mainimage} src={`${backendservice.apiurl}/storage/Products/${product?.id}/Images/${mainimage}`} />
                <div>
                    {product?.images?.map( (image : string) =>
                        <img className={styling.productimages} key={image} src={`${backendservice.apiurl}/storage/Products/${product?.id}/Images/${image}`} />
                    )}
                </div>
            </div>

            {/* Details*/}
            <div className={styling.productdetails}>
                <h1 className={styling.producttitle}>PRODUCT NAME: {product.name}</h1>
                <p>{product.description}</p>
            </div>

            {/* Buy */}
            <div className={styling.buysection}>
                {product.quantityavailable > 0 && <p className={"productstocked"}>in stock</p>}
                <p>{product.price} egp</p>
                <Addbutton params={ {product: product}} />
            </div>
        </div>
    </>

}