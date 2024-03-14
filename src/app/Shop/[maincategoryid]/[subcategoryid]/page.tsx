'use server'
import styling from "./styling.module.css"
import {Product} from "@/Data/Models/Product";
import Link from "next/link";
import * as backendservice from "@/Services/DataAPI/DataAPIService";
import {SubCategory} from "@/Data/Models/Category";

export default async function SubCategoryPage({params} : {params : {subcategoryid: string}}) {

    let subcategories : SubCategory[] = []
    let subcategory : SubCategory = {} as SubCategory
    async function GetSubCategory( subcategoryid : string ) {
        subcategory = await backendservice.GetSubCategory(subcategoryid)
    }

    async function GetSubCategories() {
        try {
            let subcategoriesresponse = await backendservice.GetCategories(subcategory.mainCategoryId)
            if (subcategoriesresponse != undefined) {
                subcategories = subcategoriesresponse
            }
        }
        catch (err) {
            console.log("failed to get subcategories")
        }
    }

    await GetSubCategory(params.subcategoryid)
    await GetSubCategories()

    return <>

        <div>

            <div className={styling.categorypage}>
                <div className={"categorysidebar"}>
                    <Link className={styling.TopCategoryLink} href={'/Shop'}>Top - Categories</Link>
                    <div className={"categories"}>
                        {subcategories?.map( (subcategory : SubCategory) =>
                            <Link className={"categorylink"} key={subcategory.id} href={`/Shop/${subcategory.mainCategoryId}/${subcategory.id}`}>{subcategory.name}</Link>
                        )}
                    </div>
                </div>
            
            
            <div className={styling.productscanvas}>
                <h3>Browsing Category {subcategory.name}</h3>
                {subcategory.products?.map((product: Product) =>
                    <Link className={styling.productcard} href={`/Shop/Product/${product.id}`} key={product.id}>
                        <img className={styling.productimage}
                             src={`${backendservice.apiurl}/storage/EShopApp/Products/${product.id}/Images/${product.images[0]}`}/>
                        <div className={styling.productinfo}>
                            {product.sellnumber > 100 && <p>most selling
                                in {product.subCategory.mainCategory.name} in {product.subCategory.name}</p>}
                            <h2>{product.name}</h2>
                            {product.quantity > 0 && <p className={"productstocked"}>in stock</p>}
                        </div>
                        <p className={styling.productprice}>{product.price} egp</p>
                    </Link>
                )}
            </div>

            </div>
        </div>
    </>
}