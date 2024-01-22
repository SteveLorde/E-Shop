import {Category} from "@/Data/Models/Category";
import {DiscountEvent} from "@/Data/Models/DiscountEvent";

export interface Product {
    id : string
    name : string
    category : Category
    description : string
    price : number
    images : string[]
    quantityavailable : number
    sellnumber : number
    discounts : DiscountEvent[]
}