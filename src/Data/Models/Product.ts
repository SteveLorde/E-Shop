import {Category} from "@/Data/Models/Category";

export interface Product {
    id : string
    name : string
    category : Category
    description : string
    bardcode : string
    price : number
    images : string[]
    quantityavailable : number
    sellnumber : number
}