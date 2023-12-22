import {Product} from "@/app/Data/Models/Product";
import {element} from "prop-types";
import {News} from "@/app/Data/Models/News";
import axios from "axios";
import {Category, ParentCategory} from "@/app/Data/Models/Category";
import {NewProductRequest} from "@/app/Components/AddProductForm/AddProductForm";
import {Mail} from "@/app/Data/Models/Mail";
import {Bool} from "reselect/es/types";

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

export async function GetProduct(productid : string) {
    try {
        let response = await axios.get(`${apiurl}/Warehouse/GetProduct/${productid}`)
        let product : Product = response.data
        return product
    }
    catch (err) {
        console.log("error fetching product")
    }
}

export async function SearchProduct(searchname : string) {
    try {
        let response = await axios.get(`${apiurl}/Warehouse/SearchProduct/${searchname}`)
        let searchedproducts : Product[] = response.data
        return searchedproducts
    }
    catch (err) {
        console.error("ERROR 404 FETCHING SEARCHED PRODUCTS")
    }
}

export async function AddProduct(newproduct : Product) {
    try {
        await axios.post(`${apiurl}/Warehouse/AddProduct`, newproduct)
    } catch (err) {
        console.log(err)
    }
}

//---------------------------------------------------------------------

export async function GetParentCategories() {
    try {
        let response = await axios.get(`${apiurl}/Warehouse/GetParentCategories`)
        let parentcategories : ParentCategory[] = response.data
        return parentcategories
    }
    catch (err) {
        console.log("ERROR 404 FETCHING Parent CATEGORIES")
    }
}

export async function GetCategories(parentcategoryid: string) {
    try {
        let response = await axios.get(`${apiurl}/Warehouse/GetCategories/${parentcategoryid}`)
        let categories : Category[] = response.data
        return categories
    }
    catch (err) {
        console.log("error fetching sub categories")
    }
}

export async function GetProductsOfCategory(categoryid : string) {
    try {
        let response = await axios.get(`${apiurl}/Warehouse/GetProductsOfParentCategory/${categoryid}`)
        let categoryproducts = response.data
        return categoryproducts
    }
    catch (err) {
        console.log(err)
    }
}

//---------------------------------------------------------------------

export async function GetMostSelling() {
    try {
        let response = await axios.get(`${apiurl}/Warehouse/MostSelling`)
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

//---------------------------------------------------------------------

export async function SendMail(newmail : Mail) {
    try {
        let response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/Mail/SendMail', newmail)
        let check : Boolean = response.data
        return check
    } catch (err) {
        console.log(err)
    }



}



