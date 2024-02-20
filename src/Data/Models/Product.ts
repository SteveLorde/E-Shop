import {SubCategory} from "@/Data/Models/Category";
import {DiscountEvent} from "@/Data/Models/DiscountEvent";

export interface Product {
    id : string
    name : string
    subCategoryId : string
    subCategory : SubCategory
    description : string
    price : number
    images : string[]
    quantityavailable : number
    sellnumber : number
    discountEvents : DiscountEvent[]
}