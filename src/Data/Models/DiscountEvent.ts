import {Product} from "@/Data/Models/Product";

export interface DiscountEvent {
    id : string
    title : string
    subtitle : string
    body : string
    startdate : string
    enddate : string
    image : string
    discountamount : number
    ispercentage : boolean
}