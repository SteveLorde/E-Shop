import {Category} from "@/Data/Models/Category";

export interface Product {
    id : string
    name : string
    category : Category
    description : string
    price : number
    images : string[]
    discounts : Event[]
    quantityavailable : number
    sellnumber : number
}