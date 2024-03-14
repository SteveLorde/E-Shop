'use server'

import * as backendservice from "@/Services/DataAPI/DataAPIService"
import {Product} from "@/Data/Models/Product";
import styling from "@/app/Shop/[maincategoryid]/styling.module.css";
import Link from "next/link";
import {DiscountEvent} from "@/Data/Models/DiscountEvent";

export async function Page({params} : {params : {discounteventid: string} }) {

    let eventproducts : Product[] = []
    let event : DiscountEvent = {} as DiscountEvent

    async function GetEvent() {
        event = await backendservice.GetEvent(params.discounteventid)
    }

    async function GetEventProducts() {
        eventproducts = await backendservice.GetEventProducts(params.discounteventid)
    }

    await GetEvent()
    await GetEventProducts()

    return <>
        <div className={styling.productscanvas}>

            <div className={"d-flex"}>
                <h2>Browsing {event.title}</h2>
                <p>{event.startdate} - {event.enddate}</p>
            </div>

            {eventproducts?.map( (product: Product) =>
                <Link className={styling.productcard} href={`/Shop/Product/${product.id}`} key={product.id}>
                    <img className={styling.productimage}
                         src={`${backendservice.apiurl}/storage/Products/${product.id}/Images/${product.images[0]}`}/>
                    <div className={styling.productinfo}>
                        {product.sellnumber > 100 &&
                            <p>most selling in {product.subCategory.mainCategory.name} in {product.subCategory.name}</p>}
                        <h2>{product.name}</h2>
                        {product.quantity > 0 && <p className={"productstocked"}>in stock</p>}
                    </div>
                    <p className={styling.productprice}>{product.price} egp</p>
                </Link>
            )}
        </div>
    </>
}