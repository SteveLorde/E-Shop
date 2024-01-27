'use client'

import {ChangeEvent, useEffect, useState} from "react";
import {Product} from "@/Data/Models/Product";
import * as backendservice from "@/Services/DataAPI/DataAPIService"

export function ProductSelectModal({OpenModal} : any) {

    const [products, setProducts] = useState<Product[]>([])
    const [selectedproducts, setSelectedProducts] = useState<string[]>([])
    const [ischecked, setCheck] = useState<boolean>(false)
    const [searchproductname, setSearchProductName] = useState<string>("")
    const [pagescount, setPageCount] = useState<number[]>([])
    const [pageproducts, setPageProducts] = useState<Product[]>([])



    const closeModal = () => {
        OpenModal = false
    };

    const setsearchname = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchProductName(e.target.value)
    }

    const SearchProduct = async () => {
        if (searchproductname != "" || null) {
            setProducts(await backendservice.SearchProduct(searchproductname))
        } else {
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

    useEffect(() => {
        CalculatePages()
        IteratePageProducts(pagescount[0])
    }, []);

    //Pagination Logic
    function CalculatePages() {
        let tencount : number = 0
        let pagecount : number = 0
        for (let i = 0; i < products.length; i++) {
            tencount += 1
            if (tencount == 10) {
                pagecount += 1
                setPageCount([...pagescount,pagecount])
                tencount = 0
            }
        }
    }

    function IteratePageProducts(pagenumber : number) {
        let startindex = (pagenumber - 1) * 10
        let endindex = startindex + 10
        let pageproducts = products.splice( startindex,endindex)
        setPageProducts(pageproducts)
    }

    return <>
        {OpenModal && <div>
            {/*Search Bar*/}
            <div>
                <input type="text" onChange={setsearchname} placeholder="search for product..."/>
                <button onClick={SearchProduct}>Search</button>
            </div>

            {/*Products Viewport*/}
            <div className={"d-grid"}>
                {pageproducts.map( (product : Product) =>
                    <div className={""} key={product.id}>
                        <img src={`${backendservice.apiurl}/eshopapp/Products/${product.id}/Images/${product.images[0]}`}/>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <input type="checkbox" checked={ischecked} onChange={ () => handleChange(product.id)} />
                    </div>
                )}
            </div>

            {/*Page Count*/}
            {pagescount.map( (pagenumber : number, index) =>
                <p onClick={ () => IteratePageProducts(pagenumber)} key={index}>{pagenumber}</p>
            )}
        </div> }

    </>
}