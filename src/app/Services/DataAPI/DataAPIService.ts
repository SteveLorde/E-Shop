import {Product} from "@/app/Data/Models/Product";
import {forEach} from "react-bootstrap/ElementChildren";
import {element} from "prop-types";
import {News} from "@/app/Data/Models/News";

export async function GetCategories() {
    let response = await fetch(`http://localhost:5171/Warehouse/GetCategories`)
    let shopcategories : string[] =  await response.json()
    return shopcategories
}

export async function GetProductsOfCategory(category : string) {
    let response = await fetch(`http://localhost:5171/Warehouse/${category}`)
    let parsedresponse : Product[] =  await response.json()
    return parsedresponse
}

export async function GetProduct(productid : number) {
    let response = await fetch(`http://localhost:5171/Warehouse/GetProduct/${productid}`)
    let productdata = await response.json()
    return productdata
}

export async function GetMostSelling() {
    let response = await fetch('http://localhost:5171/Warehouse/MostSelling')
    return await response.json() as Product[]
}

export async function GetNews() {
    let response = await fetch('http://localhost:5171/News/GetNews')
    let news : News[] = await response.json()
    return news
}
