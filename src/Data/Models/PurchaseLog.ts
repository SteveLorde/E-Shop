import {Product} from "@/Data/Models/Product";
import {CartItem} from "@/Data/Models/CartItem";

export interface PurchaseLog {
    userid : string
    checkouton : number
    items : CartItem[]
    totalamount : number
}