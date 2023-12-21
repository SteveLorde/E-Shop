export interface ParentCategory {
    id : string
    name : string
    categories: Category[]

}

export interface Category{
    id : string
    name : string
    parentcategory : ParentCategory
}