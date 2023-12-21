import { Product } from "./Product";
import {CartItem} from "@/app/Data/Models/CartItem";

export interface Cart {
    items : CartItem[]
}