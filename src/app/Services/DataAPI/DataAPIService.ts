import {Product} from "@/app/Data/Models/Product";
import {forEach} from "react-bootstrap/ElementChildren";
import {element} from "prop-types";
import {News} from "@/app/Data/Models/News";
import axios from "axios";

export async function GetCategories() {
    let categories : string[] = await axios.get(`http://localhost:5171/Warehouse/GetCategories`)
    return categories
}

export async function GetProductsOfCategory(category : string) {
    let categoryproducts : Product[] = await axios.get(`http://localhost:5171/Warehouse/${category}`)
    return categoryproducts
}

export async function GetProduct(productid : number) {
    let product : Product= await axios.get(`http://localhost:5171/Warehouse/GetProduct/${productid}`)
    return product
}

export async function GetMostSelling() {
    let response = await axios.get('http://localhost:5171/Warehouse/MostSelling')
    let mostselling : Product[] = response.data
    return mostselling
}

export async function GetNews() {
    let response = await axios.get('http://localhost:5171/News/GetNews')
    let news : News[] = response.data
    return news
}
