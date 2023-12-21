export interface Product {
    id : string
    name : string
    category : string
    description : string
    bardcode : string
    price : number
    images : string[]
    quantityavailable : number
    sellnumber? : number
    imagefiles?: File[]

}