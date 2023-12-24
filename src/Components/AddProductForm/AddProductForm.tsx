'use client'

import {useFieldArray, useForm} from "react-hook-form";
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import {useState} from "react";
import {Category, ParentCategory} from "@/Data/Models/Category";
import {Product} from "@/Data/Models/Product";


export interface NewProductRequest {
    name : string
    category : Category
    description : string
    price : number
    images : string[]
    barcode : string
    quantityavailable : number
    imagefiles?: File[]
}

export default function AddProductForm() {
    const [categories, setCategories] = useState<ParentCategory[]>([])
    const {register: newproductform, handleSubmit: newproductsubmit } = useForm<NewProductRequest>()
    let imagefiles : any
    const [imagespreviews, setImagesPreviews] = useState([])

    async function GetCategories() {
        let categories = await backendservice.GetParentCategories()
        if (categories != undefined) {
            setCategories(categories)
        }
    }

    function handleImageUploadChange(event : React.ChangeEvent<HTMLInputElement>) {
        imagefiles = event.target.files
    }

    function OutputImages() {

    }

    async function SubmitNewProduct(newproductreq : NewProductRequest) {
        let newproduct : Product = {} as Product
        {
            newproduct.name = newproductreq.name
            newproduct.description = newproductreq.description
            newproduct.price = newproductreq.price
            newproduct.quantityavailable = newproductreq.quantityavailable
            newproduct.category = newproductreq.category
            newproduct.images = newproductreq.images
            newproduct.bardcode = newproductreq.barcode
        }
        let check = await backendservice.AddProduct(newproduct)
        if (check) {
            //await backendservice.UploadProductImages(imagefiles)
        }
    }

    return <>
        <form onSubmit={newproductsubmit(SubmitNewProduct)}>
            <h2>Product Title</h2>
            <input type="text" {...newproductform('name')} />
            <h2>Product Images</h2>
            <input type="file" {...newproductform('images')} multiple/>
            <h2>product category</h2>
            <select {...newproductform('category')}>
                {categories?.map( (category: ParentCategory, index) =>
                <div key={index}>
                    <p >{category.name}</p>
                    {category.categories?.map( (subcategory: Category) =>
                        <option key={subcategory.id}>{subcategory.name}</option>
                    )}
                </div>
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