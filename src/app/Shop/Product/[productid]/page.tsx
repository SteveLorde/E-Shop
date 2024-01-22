'use server'

import {Product} from "@/Data/Models/Product"
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import styling from './styling.module.css'
import AddToCartButton from '../../../../Components/AddToCartButton/AddToCartButton'


export default async function Product({params} : {params: {productid : string}}) {

    let product : Product = await backendservice.GetProduct(params.productid)
    let mainimage : any = product?.images[0]

    function CalculateDiscountedPrice() {
        let discountedprice : number = 0
        for (let i = 0; i < product.discounts.length; i++) {
            let discount = product.discounts[i]
            if (discount.ispercentage) {
                discountedprice *= discount.discountamount
            }
            else {
                discountedprice -= discount.discountamount
            }
        }
        return discountedprice
    }

    const GetFinalPrice = () => {
        let finalprice: number = product.price
        if (product.discounts.length > 0) {
            finalprice = CalculateDiscountedPrice()
            return <div>
                <p>{product.price}</p>
                <p>{finalprice}</p>
            </div>
        } else {
            return <p>{finalprice}</p>
        }
    }

    return <>
        <div className={styling.productpagecanvas}>
            {/* IMAGE*/}
            <div className={styling.productgallery} >
                <img className={styling.mainimage} src={`${backendservice.apiurl}/storage/Products/${product?.id}/Images/${mainimage}`} />
                <div>
                    {product?.images?.map( (image : string) =>
                        <img className={styling.productimages} key={image} src={`${backendservice.apiurl}/storage/eshopapp/Products/${product?.id}/Images/${image}`} />
                    )}
                </div>
            </div>

            {/* Details*/}
            <div className={styling.productdetails}>
                <h1 className={styling.producttitle}>PRODUCT NAME: {product.name}</h1>
                <p>{product?.description}</p>
            </div>

            {/* Buy */}
            <div className={styling.buysection}>
                {product.quantityavailable > 0 && <p className={"productstocked"}>in stock</p>}
                {/* ORIGINAL PRICE && CALCULATE PRICE AFTER DISCOUNTS */}
                {GetFinalPrice()}
                <AddToCartButton params={ {product: product}} />
            </div>
        </div>
    </>

}