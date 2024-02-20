'use server'

import {Product} from "@/Data/Models/Product"
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import styling from './styling.module.css'
import AddToCartButton from '../../../../Components/AddToCartButton/AddToCartButton'
import Link from "next/link";
import cs from "classnames"


export default async function Product({params} : {params: {productid : string}}) {

    let product : Product = await backendservice.GetProduct(params.productid)
    let mainimage : any = product.images[0]

    function CalculateDiscountedPrice() {
        let discountedprice : number = product.price
        for (let i = 0; i < product.discountEvents.length; i++) {
            let discount = product.discountEvents[i]
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
        if (product.discountEvents.length > 0) {
            finalprice = CalculateDiscountedPrice()
            return <div className={"d-flex flex-column align-items-center"}>
                <p className={"text-decoration-line-through"}>{product.price} EGP</p>
                <p className={"fs-2 fw-bold"}>{finalprice} EGP</p>
            </div>
        } else {
            return <p className={"fs-2 fw-bold f"}>{finalprice} EGP</p>
        }
    }

    return <>
        <div className={styling.productpage}>

            <div className={"d-flex flex-row gap-1"}>
                <Link href={"/"}>Home</Link>
                <p>/</p>
                <Link href={`/Shop/${product.subCategory.mainCategoryId}`}>{product.subCategory.mainCategory.name}</Link>
                <p>/</p>
                <Link href={`/Shop/${product.subCategory.mainCategory.id}/${product.subCategory.id}`}>{product.subCategory.name}</Link>
                <p>/</p>
                <p>{product.name}</p>
            </div>

            <div className={styling.productpagecanvas}>
                {/* IMAGE*/}
                <div className={styling.productgallery}>
                    <img className={styling.mainimage}
                         src={`${backendservice.apiurl}/storage/eshopapp//Products/${product?.id}/Images/${mainimage}`}/>
                    <div>
                        {product?.images?.map((image: string) =>
                            <img className={styling.productimages} key={image}
                                 src={`${backendservice.apiurl}/storage/eshopapp/Products/${product?.id}/Images/${image}`}/>
                        )}
                    </div>
                </div>

                {/* Details*/}
                <div className={styling.productdetails}>
                    <h1 className={styling.producttitle}>PRODUCT NAME: {product.name}</h1>
                    <p>{product?.description}</p>
                </div>

                {/* Buy */}
                <div className={"d-flex flex-column align-content-center align-items-center m-4 p-4"}>
                    {product.quantityavailable > 0 && <p className={"productstocked"}>in stock</p>}
                    {/* ORIGINAL PRICE && CALCULATE PRICE AFTER DISCOUNTS */}
                    {GetFinalPrice()}
                    <AddToCartButton product={product}/>
                </div>
            </div>

        </div>
    </>

}