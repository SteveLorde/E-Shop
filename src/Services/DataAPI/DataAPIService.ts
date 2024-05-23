import {Product} from "@/Data/Models/Product";
import {element} from "prop-types";
import {DiscountEvent} from "@/Data/Models/DiscountEvent";
import axios from "axios";
import {SubCategory, MainCategory} from "@/Data/Models/Category";
import {Mail} from "@/Data/Models/Mail";
import {Bool} from "reselect/es/types";

export async function GetEventProducts(discounteventid: string) {
    let response = await axios.get(`${apiurl}/eshop/warehouse/geteventproducts/${discounteventid}`)
    let products : Product[] = response.data
    return products
}


export const apiurl = process.env.NEXT_PUBLIC_API_URL


export async function GetProducts() {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getallproducts`)
        let products : Product[] = response.data
        return products
}

export async function GetProduct(productid : string) {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getproduct/${productid}`)
        let product : Product = response.data
        console.log(product)
        return product
}

export async function SearchProduct(searchname : string) {
        let response = await axios.get(`${apiurl}/eshop/warehouse/searchproduct/${searchname}`)
        let searchedproducts : Product[] = response.data
        return searchedproducts
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
        let parentcategories = await axios.get(`${apiurl}/eshop/warehouse/getmaincategories`).then(res => res.data).catch(res => console.log(res))
        return parentcategories
}

export async function GetCategories(parentcategoryid: string) {
    try {
        let response = await axios.get(`${apiurl}/eshop/warehouse/getsubcategories/${parentcategoryid}`)
        let categories : SubCategory[] = response.data
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

export async function GetSubCategory(subcategoryid : string) {
    let response = await axios.get<SubCategory>(`${apiurl}/eshop/warehouse/getsubcategory/${subcategoryid}`).then(res => res.data)
    return response
}

//---------------------------------------------------------------------

export async function GetMostSelling() {

        let response = await axios.get(`${apiurl}/eshop/warehouse/mostselling`)
        let mostselling : Product[] = response.data
        return mostselling
}

export async function GetEvents() {
    try {
        let response = await axios.get(`${apiurl}/eshop/events/getevents`)
        let news: DiscountEvent[] = response.data
        return news
    } catch (err) {
        console.log(err)
    }
}

export async function AddEvent(newevent : DiscountEvent) {
    let response = await axios.post<boolean>(`${apiurl}/eshop/events/addevent`, newevent)
    return response.data
}

export async function GetEvent(eventid : string) {
    let response = await axios.get<DiscountEvent>(`${apiurl}/eshop/events/getevent/${eventid}`)
    let event = response.data
    return event
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





