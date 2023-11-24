'use server'
import Link from "next/link";
import * as backendservice from '@/app/Services/DataAPI/DataAPIService'
import {Product} from "@/app/Data/Models/Product";

function Shop() {
    
    let categories : string[] = []
    let mostsellingproducts : Product[] = []
    
    async function GetCategories() {
        return await backendservice.GetCategoriesTest()
    }
    
    return <>
    <div>
        <h1>TEST SHOP PAGE</h1>
        <div className={'categories'}>
            {categories?.map( (category : string) => 
                <Link key={category} href={`Shop/${category}`}>{category}</Link>
            )}
        </div>

        <div>

            <div>
                {mostsellingproducts?.map( (product : Product) =>
                    <div key={product.name}>

                    </div>
                )}
            </div>

        </div>


    </div>
    </>  
    
}

export default Shop;