import {Product} from "@/Data/Models/Product";

export interface MainCategory {
    id : string
    name : string
    subCategories: SubCategory[]
}

export interface SubCategory {
    id : string
    name : string
    mainCategoryId : string
    mainCategory : MainCategory
    products : Product[]
}