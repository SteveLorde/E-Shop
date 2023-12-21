import {useFieldArray, useForm} from "react-hook-form";
import * as backendservice from '../../Services/DataAPI/DataAPIService'
import {useState} from "react";
import {Category} from "@/app/Data/Models/Category";


export interface NewProductRequest {
    id? : string
    name? : string
    category? : string
    description? : string
    price? : number
    images? : string[]
    quantityavailable? : number
    imagefiles?: File[]

}


export default function AddProductForm() {
    const [categories, setCategories] = useState([])
    const {register: newproductform, handleSubmit: newproductsubmit } = useForm<NewProductRequest>()

    async function GetCategories() {
        let categories = await backendservice.GetCategories()
        setCategories(categories)
    }

    function handleImageUploadChange(e : any) {
        const imagefiles = e.target.files
    }

    async function SubmitNewProduct(formdata : NewProductRequest) {
        let newproduct = formdata
        await backendservice.AddProduct(newproduct)
    }

    return <>
        <form onSubmit={newproductsubmit(SubmitNewProduct)}>
            <h2>Product Title</h2>
            <input type="text" {...newproductform('name')} />
            <h2>Product Images</h2>
            <input type="file" {...newproductform('images')} multiple/>
            <h2>product category</h2>
            <select {...newproductform('category')}>
                {categories?.map( (category: Category, index) =>
                        <option key={index} value={category.id} >{category.parentcategory.name} - {category.name}</option>
                    )}
            </select>
            <h2>Product Barcode</h2>
            <input type="text"  />

            <h2>price</h2>
            <input type='number' {...newproductform('price')} />

            <input type='submit' value="Add New Product" />

        </form>
    </>
}