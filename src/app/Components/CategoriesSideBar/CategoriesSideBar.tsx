import {useState} from "react";
import Link from "next/link";

export default function CategoriesSideBar() {

    const [categories, setCategories] = useState<string[]>([])


    return <>
        <ul>
            {categories?.map( (category : string) =>
                <Link key={category} href={`/Shop/${category}`}>{category}</Link>
            )}
        </ul>
    </>

}