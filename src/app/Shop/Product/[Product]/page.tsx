'use server'
import {Product} from "@/app/Data/Models/Product"
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'


export default async function Product({params}: {params : {productid : number}}) {

    let productid : number = params.productid
    let product : Product | any = await backendservice.GetProduct(productid)
    let image : string = " "

    async function AddToCart(product: Product | undefined) {

    }

    async function ChangeImage(image : string) {

    }

    return <>
        <div>
            {/* IMAGE*/}
            <div>
                <img src={process.env.API_URL + `/storage/Products/${product?.id}/Images/${image}`} />
                <div>
                    {product?.images?.map( (image : string) =>
                        <img onClick={ () => ChangeImage(image) } key={image} src={process.env.NEXT_PUBLIC_API_URL + `/storage/Products/${product?.id}/Images/${image}`} />
                    )}
                </div>
            </div>
            {/* Details*/}
            <div>
                <h1>PRODUCT NAME: {product?.name}</h1>
                <p>{product?.description}</p>
            </div>
            {/* Buy */}
            <div>
                <button >Add to Cart</button>
                <p>Available Quantity: {product?.quantityavailable}</p>
            </div>
        </div>
    </>
}