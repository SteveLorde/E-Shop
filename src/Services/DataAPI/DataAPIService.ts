import {Product} from "@/Data/Models/Product";
import {element} from "prop-types";
import {Event} from "@/Data/Models/Event";
import axios from "axios";
import {Category, ParentCategory} from "@/Data/Models/Category";
import {Mail} from "@/Data/Models/Mail";
import {Bool} from "reselect/es/types";

export async function GetEventProducts(discounteventid: string) {
    let response = await axios.get(`${apiurl}/eshop/warehouse/geteventproducts/${discounteventid}`)
    let products : Product[] = response.data
    return products
}


export const apiurl = process.env.NEXT_PUBLIC_API_URL

export async function GetProducts() {
    try {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getallproducts`)
        let products : Product[] = response.data
        return products
    }
    catch (err) {
        console.log("ERROR 404 FETCHING PRODUCTS")
    }
}

export async function GetProduct(productid : string) {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getproduct/${productid}`)
        let product : Product = response.data
        return product
}

export async function SearchProduct(searchname : string) {
    try {
        let response = await axios.get(`${apiurl}/eshop/warehouse/searchproduct/${searchname}`)
        let searchedproducts : Product[] = response.data
        return searchedproducts
    }
    catch (err) {
        console.error("ERROR 404 FETCHING SEARCHED PRODUCTS")
    }
}

export async function AddProduct(newproduct : Product) {
    try {
        await axios.post(`${apiurl}/e/shop/warehouse/addproduct`, newproduct)
        return true
    } catch (err) {
        console.log(err)
    }
}

//---------------------------------------------------------------------

export async function GetParentCategories() {
    try {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getparentcategories`)
        let parentcategories : ParentCategory[] = response.data
        return parentcategories
    }
    catch (err) {
        console.log("ERROR 404 FETCHING Parent CATEGORIES")
    }
}

export async function GetCategories(parentcategoryid: string) {
    try {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getcategories/${parentcategoryid}`)
        let categories : Category[] = response.data
        return categories
    }
    catch (err) {
        console.log("error fetching sub categories")
    }
}

export async function GetCategoryProducts(categoryid : string) {
    try {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getcategoryproducts/${categoryid}`)
        let categoryproducts = response.data
        return categoryproducts
    }
    catch (err) {
        console.log(err)
    }
}

//---------------------------------------------------------------------

export async function GetMostSelling() {

        let response = await axios.get(`${apiurl}/eshop/warehouse/mostselling`)
        let mostselling : Product[] = response.data
        return mostselling
}

export async function GetNews() {
    try {
        let response = await axios.get(`${apiurl}/eshop/news/getnews`)
        let news: Event[] = response.data
        return news
    } catch (err) {
        console.log(err)
    }
}

//---------------------------------------------------------------------

export async function SendMail(newmail : Mail) {
    try {
        let response = await axios.post(`${apiurl}/mail/sendmail`, newmail)
        let check : Boolean = response.data
        return check
    } catch (err) {
        console.log(err)
    }



}



