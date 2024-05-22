'use client'

import {Product} from "@/Data/Models/Product";
import {useEffect, useState} from "react";
import * as backendservice from "@/Services/DataAPI/DataAPIService"
import {useForm} from "react-hook-form";
import AddProductForm from "@/Components/Admin/AddProductForm/AddProductForm";
import AddEventForm from "@/Components/Admin/AddEventForm/AddEventForm";


export default function AdminPanel( {params} : { params: {adminid : string} }  ) {
    const [products, setProducts] = useState<Product[]>([]);


    async function GetProducts() {
        let products : Product[] | any = await backendservice.GetProducts()
        setProducts(products)
    }


    useEffect(() => {
        GetProducts()
    }, []);

    return <>

        <div>
            {/*Add Product Form*/}
            <div>
                <AddProductForm />
            </div>

            {/*Add Event Form*/}
            <AddEventForm></AddEventForm>

            {/*Search All Events in System*/}
            {/*

             <div>
                <img src={`${backendservice.apiurl}/storage/EShopApp/Events/${event.id}/Images/${}`} />
            </div>

            */}

            {/*Search All Products in System*/}
            <div>
                <h2>All Products</h2>
                <div>
                    {products?.map( (product : Product, index) =>
                        <div key={index}>
                            <p><img src={`/api/storage/Products/${product.id}/Images/${product.images[0]}`} />{product.name}</p>
                            <div>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </div>

    </>
}