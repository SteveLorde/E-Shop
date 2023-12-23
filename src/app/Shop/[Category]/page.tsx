'use server'
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {Product} from "@/app/Data/Models/Product";
import Link from "next/link";
import {Category, ParentCategory} from "@/app/Data/Models/Category";
import styling from "./styling.module.css"

export default async function Page( {params} : {params : {Category: string}}) {

    let subcategories : Category[] = []
    let pageproducts : Product[] = []

    async function GetSubCategories() {
        try {
            let subcategoriesresponse = await backendservice.GetCategories(params.Category)
            if (subcategoriesresponse != undefined) {
                subcategories = subcategoriesresponse
            }
        }
        catch (err) {
            console.log("failed to get subcategories")
        }
    }

    async function GetCategoryProducts(categoryid : string) {
        try {
            pageproducts = await backendservice.GetCategoryProducts(categoryid)
        }
        catch (err) {
            console.log("failed to get category products")
        }
    }

    await GetSubCategories()
    await GetCategoryProducts(params.Category)

    return <>
        <div className={styling.categorypage}>
            <div className={"categorysidebar"}>
                <Link className={styling.TopCategoryLink} href={'/Shop'}>Sub - Categories</Link>
                <div className={"categories"}>
                    {subcategories?.map( (subcategory : Category) =>
                        <Link className={"categorylink"} key={subcategory.id} href={`/Shop/${params.Category}/${subcategory.id}`}>{subcategory.name}</Link>
                    )}
                </div>
            </div>

            <div className={styling.productscanvas}>
                <h3>Browsing Category {subcategories[0].parentCategory.name}</h3>
                {pageproducts?.map( (product : Product) =>
                    <Link className={styling.productcard} href={`/Shop/Product/${product.id}`} key={product.id}>
                        <img className={styling.productimage} src={`${backendservice.apiurl}/storage/Products/${product.id}/Images/${product.images[0]}`} />
                        <div className={styling.productinfo}>
                            { product.sellnumber > 100 && <p>most selling in {product.category.parentCategory.name} in {product.category.name}</p>}
                            <h2>{product.name}</h2>
                            {product.quantityavailable > 0 && <p className={"productstocked"}>in stock</p>}
                        </div>
                        <p className={styling.productprice}>{product.price} egp</p>
                    </Link>
                )}
            </div>
        </div>
    </>

}