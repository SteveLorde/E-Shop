import {Product} from "@/app/Data/Models/Product";

export interface CartItem {
    product : Product
    quantity : number
}