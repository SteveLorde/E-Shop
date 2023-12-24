import { Product } from "./Product";
import {CartItem} from "@/Data/Models/CartItem";

export interface Cart {
    items : CartItem[]
}