import {useEffect, useState} from "react";
import Link from "next/link";
import * as backendservice from "../../Services/DataAPI/DataAPIService"
import {Category} from "@/app/Data/Models/Category";

export default function CategoriesSideBar() {

    /*

    WORK IN PROGRESS

    const [categories, setCategories] = useState<Category[]>([])

    async function GetCategories() {
        let categories = await backendservice.GetCategories()
        setCategories(categories)
    }

    useEffect(() => {
        GetCategories()
    }, []);

    return <>
        <h2>Categories</h2>
        <ul>
            {categories?.map( (category : Category) =>
                <Link key={category.id} href={`/Shop/${category.parentcategoryname}`}>{category.parentcategoryname}</Link>
            )}
        </ul>
    </>
     */
}