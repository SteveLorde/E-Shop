import styling from "./styling.module.css"
import {Product} from "@/Data/Models/Product";
import Link from "next/link";
import * as backendservice from "@/Services/DataAPI/DataAPIService";

export default async function Page() {



    return <>
        <div>
            
            <div>
                <Link href={} />
            </div>
            
            
            <div className={styling.productscanvas}>
                <h3>Browsing Category {subcategories[0].parentCategory.name}</h3>
                {pageproducts?.map((product: Product) =>
                    <Link className={styling.productcard} href={`/Shop/Product/${product.id}`} key={product.id}>
                        <img className={styling.productimage}
                             src={`${backendservice.apiurl}/storage/EShopApp/Products/${product.id}/Images/${product.images[0]}`}/>
                        <div className={styling.productinfo}>
                            {product.sellnumber > 100 && <p>most selling
                                in {product.subCategory.parentCategory.name} in {product.subCategory.name}</p>}
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