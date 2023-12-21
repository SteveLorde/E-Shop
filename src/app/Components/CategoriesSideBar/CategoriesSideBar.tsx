import {useState} from "react";
import Link from "next/link";
import * as backendservice from "../../Services/DataAPI/DataAPIService"
import {Category} from "@/app/Data/Models/Category";

export default function CategoriesSideBar() {

    const [categories, setCategories] = useState<Category[]>([])

    async function GetCategories() {
        let categories = await backendservice.GetCategories()
        setCategories(categories)
    }

    return <>
        <h2>Categories</h2>
        <ul>
            {categories?.map( (category : Category) =>
                <Link href={`/Shop/${category}`}>{category.parentcategory.name}</Link>
            )}
        </ul>
    </>

}