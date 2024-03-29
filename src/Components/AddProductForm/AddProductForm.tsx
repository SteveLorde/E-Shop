'use client'

import {useFieldArray, useForm} from "react-hook-form";
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import {useState} from "react";
import {SubCategory, MainCategory} from "@/Data/Models/Category";
import {Product} from "@/Data/Models/Product";

export default function AddProductForm() {
    const [categories, setCategories] = useState<MainCategory[]>([])
    const {register: newproductform, handleSubmit: newproductsubmit } = useForm<Product>()
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

    async function SubmitNewProduct(newproductreq : Product) {
        let newproduct : Product = {
            subCategoryId: "",
            discountEvents: [],
            id: "",
            sellnumber: 0,
            name: newproductreq.name,
            description: newproductreq.description,
            price: newproductreq.price,
            quantity: newproductreq.quantity,
            subCategory: newproductreq.subCategory,
            images: newproductreq.images
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
            <select {...newproductform('subCategory')}>
                {categories?.map( (category: MainCategory, index) =>
                <div key={index}>
                    <p >{category.name}</p>
                    {category.categories?.map( (subcategory: SubCategory) =>
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