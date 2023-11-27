'use client'
import {Product} from "@/app/Data/Models/Product"
import {useState} from "react"
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'


export default function Product({params}: {params : {productid : number}}) {

    let productid : number = params.productid
    const [product, setProduct] = useState<Product>()
    const [image, setMainImageView] = useState(product?.images[0])

    async function GetProduct() {
        let product = await backendservice.GetProduct(productid)
        setProduct(product)
    }

    async function AddToCart(product: Product | undefined) {

    }

    function ChangeImage(image : string) {
        setMainImageView(image)
    }

    return <>
        <div>
            {/* IMAGE*/}
            <div>
                <div>
                    {product?.images?.map( (image : string) =>
                        <img onClick={ () => ChangeImage(image) } key={image} src={`/api/storage/Products/${product?.id}/${image}`} />
                    )}
                </div>
                <img src={`/api/storage/${product?.id}/${image}`} />
            </div>
            {/* Details*/}
            <div>
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
            </div>
            {/* Buy */}
            <div>
                <button onClick={ () => AddToCart(product) }>Add to Cart</button>
                <p>Available Quantity: {product?.quantity}</p>
            </div>
        </div>
    </>
}