export interface MainCategory {
    id : string
    name : string
    categories: SubCategory[]
}

export interface SubCategory {
    id : string
    name : string
    mainCategoryId : string
    mainCategory : MainCategory
}