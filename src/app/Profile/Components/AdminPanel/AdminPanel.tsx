import {Product} from "@/app/Data/Models/Product";
import {useEffect, useState} from "react";
import * as backendservice from "@/app/Services/DataAPI/DataAPIService"
import {useForm} from "react-hook-form";


export default function AdminPanel() {
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
            <form>
                <h1>Product Images</h1>

            </form>
            <button>Add Product</button>
        </div>

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


    </>
}