'use client'

import {useState} from "react";
import {Product} from "@/Data/Models/Product";
import * as backendservice from "@/Services/DataAPI/DataAPIService"

export function ProductSelectModal() {
    
    const [products, setProducts] = useState<Product[]>([])
    const [selectedproducts, setSelectedProducts] = useState<string[]>([])
    const [ischecked, setCheck] = useState<boolean>(false)
    async function SearchProduct(name : string) {
        if (name != "" || null) {
            setProducts(await backendservice.SearchProduct(name))
        }
        else {
            setProducts(await backendservice.GetProducts())
        }
    }

    function SelectProduct(productid : string) {
        setSelectedProducts([...selectedproducts, productid])
    }

    function UnSelectProduct(productid : string) {
        setSelectedProducts(selectedproducts.filter(selectedid => selectedid != productid))
    }
    const handleChange = (productid : string) => {
        setCheck(!ischecked);
        if (!ischecked) {
            SelectProduct(productid);
        } else {
            UnSelectProduct(productid);
        }
    }

    return <>
        {/*Search Bar*/}
        <input type="text" placeholder="search for product..." />

        {/*Products Viewport*/}
        <div className={"d-grid"}>
            {products.map( (product : Product) =>
                <div className={""} key={product.id}>
                    <img src={`${backendservice.apiurl}/eshopapp/Products/${product.id}/Images/${product.images[0]}`}/>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <input type="checkbox" checked={ischecked} onChange={ () => handleChange(product.id)} />
                </div>
            )}
        </div>

    </>
}