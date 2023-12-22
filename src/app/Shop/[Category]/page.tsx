'use server'
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {Product} from "@/app/Data/Models/Product";
import Link from "next/link";
import {Category, ParentCategory} from "@/app/Data/Models/Category";


export default async function Page( {params}) {

    let subcategories : Category[] | any
    let pageproducts : Product[] | any

    async function GetSubCategories() {
        try {
            subcategories = await backendservice.GetCategories(params.Category)
        }
        catch (err) {
            console.log("failed to get subcategories")
        }
    }

    async function GetCategoryProducts() {
        try {
            pageproducts = await backendservice.GetProductsOfCategory(params.Category)
        }
        catch (err) {
            console.log("failed to get category products")
        }
    }

    await GetSubCategories()

    return <>

        <div className={"categorysidebar"}>
            <h3>Sub - Categories</h3>
            <div className={"categories"}>
                {subcategories?.map( (subcategory : Category) =>
                    <Link className={"categorylink"} key={subcategory.id} href={'/'}>{subcategory.name}</Link>
                )}
            </div>
        </div>



        <div>
            {pageproducts?.map( (product : Product) =>
                <Link href={`/Shop/Product/${product.id}`} key={product.id}>
                    <img src={ process.env.API_URL + `/Products/${product.id}/Images/${product.images[0]}`} />
                    <div>
                        { product.sellnumber > 100 && <p>most selling in {product.category}</p>}
                        <h2>{product.name}</h2>
                    </div>
                    <p>{product.price}</p>
                </Link>
            )}
        </div>
    </>

}