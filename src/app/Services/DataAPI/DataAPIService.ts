import {Product} from "@/app/Data/Models/Product";
import {element} from "prop-types";
import {News} from "@/app/Data/Models/News";
import axios from "axios";
import {Category} from "@/app/Data/Models/Category";
import {NewProductRequest} from "@/app/Components/AddProductForm/AddProductForm";
import {Mail} from "@/app/Data/Models/Mail";

const apiurl = process.env.NEXT_PUBLIC_API_URL

export async function GetProducts() {
    try {
        let response = await axios.get(`${apiurl}/Warehouse/GetAllProducts`)
        let products : Product[] = response.data
        return products
    }
    catch (err) {
        console.log("ERROR 404 FETCHING PRODUCTS")
    }
}

export async function SearchProduct(searchname : string) {
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/Warehouse/SearchProduct/${searchname}`)
        let searchedproducts : Product[] = response.data
        return searchedproducts
    }
    catch (err) {
        console.error("ERROR 404 FETCHING SEARCHED PRODUCTS")
    }
}

export async function GetParentCategories() {
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/Warehouse/GetParentCategories`)
        let categories : string[] = response.data
        return categories
    }
    catch (err) {
        console.log("ERROR 404 FETCHING CATEGORIES")
    }
}

export async function GetCategories() {
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/Warehouse/GetCategories`)
        let categories : Category[] = response.data
        return categories
    }
    catch (err) {
        console.log("ERROR 404 FETCHING CATEGORIES")
    }
}

export async function GetProductsOfCategory(parentcategoryid : string) {
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/Warehouse/GetProductsOfParentCategory/${parentcategoryid}`)
        let categoryproducts = response.data
        return categoryproducts
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetProductsOfSubCategory(subcategoryid : string) {
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/Warehouse/GetProductsOfSubCategory/${subcategoryid}`)
        let categoryproducts = response.data
        return categoryproducts
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetProduct(productid : number) {
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/Warehouse/GetProduct/${productid}`)
        let product : Product = response.data
        return product
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetMostSelling() {
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/Warehouse/MostSelling')
        let mostselling : Product[] = response.data
        return mostselling
    }
    catch (err) {
        console.log(err)
    }
}

export async function GetNews() {
    try {
        let response = await axios.get(`${apiurl}/News/GetNews`)
        let news: News[] = response.data
        return news
    } catch (err) {
        console.log(err)
    }
}

    export async function AddProduct(newproduct : Product) {
        try {
            await axios.post(process.env.NEXT_PUBLIC_API_URL + '/Warehouse/AddProduct', newproduct)
        } catch (err) {
            console.log(err)
        }
    }

export async function SendMail(newmail : Mail) {
    try {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + '/Mail/SendMail', newmail)
    } catch (err) {
        console.log(err)
    }
}



