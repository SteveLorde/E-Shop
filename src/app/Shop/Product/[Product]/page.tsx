'use server'
import {Product} from "@/app/Data/Models/Product"
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import styling from './styling.module.css'
import Addbutton from './AddToCartButton'


export default async function Product({params} : {params: {Product : string}}) {

    let product : Product = await backendservice.GetProduct(params.Product)
    let image : any = product.images[0]

    const testbutton = console.log("LOL")


    async function AddToCart() {
        alert("ADD TO CART TRIGGERED")
    }

    async function ChangeImage(image : string) {

    }

    return <>
        <div className={styling.productpagecanvas}>
            {/* IMAGE*/}
            <div className={styling.productgallery} >
                <img className={styling.mainimage} src={`${backendservice.apiurl}/storage/Products/${product?.id}/Images/${image}`} />
                <div>
                    {product?.images?.map( (image : string) =>
                        <img className={styling.productimages} key={image} src={`${backendservice.apiurl}/storage/Products/${product?.id}/Images/${image}`} />
                    )}
                </div>
            </div>

            {/* Details*/}
            <div className={styling.productdetails}>
                <h1 className={styling.producttitle}>PRODUCT NAME: {product?.name}</h1>
                <p>{product?.description}</p>
            </div>



            {/* Buy */}
            <div className={styling.buysection}>
                {product.quantityavailable > 0 && <p className={"productstocked"}>in stock</p>}
                <p>{product.price} egp</p>
                <Addbutton params={ {product: product}} />
                <button className={styling.addtocart}></button>
            </div>
        </div>
    </>
}