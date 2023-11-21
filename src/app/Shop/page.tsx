'use client'
import Link from "next/link";
import { useState } from "react";

function Shop() {

    const [shoppingcategories, SetShoppingCategories] = useState<string[]>([])


    function GetCategories() {
        
    }
    
    return <>
    <div>
        <h1>TEST SHOP PAGE</h1>
        <div className={'categories'}> </div>
    </div>
    </>  
    
}

export default Shop;