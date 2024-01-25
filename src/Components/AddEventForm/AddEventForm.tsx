'use client'

import {useFieldArray, useForm} from "react-hook-form";
import * as backendservice from '@/Services/DataAPI/DataAPIService'
import {useState} from "react";
import {Category, ParentCategory} from "@/Data/Models/Category";
import {Product} from "@/Data/Models/Product";
import {DiscountEvent} from "@/Data/Models/DiscountEvent";

export default function AddEventForm() {
    const [categories, setCategories] = useState<ParentCategory[]>([])
    const {register: neweventform, handleSubmit: neweventsubmit } = useForm<DiscountEvent>()
    let eventimagefile : any
    const [imagespreviews, setImagesPreviews] = useState([])

    function handleImageUploadChange(event : React.ChangeEvent<HTMLInputElement>) {
        eventimagefile = event.target.files
    }

    async function SubmitNewEvent(newevent : DiscountEvent) {
        let neweventreq : DiscountEvent = {} as DiscountEvent
        let check = await backendservice.AddEvent(neweventreq)
        if (check) {
            //await backendservice.UploadProductImages(imagefiles)
        }
    }

    return <>
        <form onSubmit={neweventsubmit(SubmitNewEvent)}>
            <h2>Event Title</h2>
            <input type="text" {...neweventform('title')} />
            <h2>Event Subtitle</h2>
            <input type="text" {...neweventform('subtitle')}/>
            <h2>Event Cover Image</h2>
            <input type="file" {...neweventform('image')}/>
            <h2>Discount Amount</h2>
            <input type='number' {...neweventform('discountamount')} />
            <input type='submit' value="Add New Product"/>
        </form>
    </>

    {/*
                        <select {...neweventform('category')}>
                {categories?.map((category: ParentCategory, index) =>
                    <div key={index}>
                        <p>{category.name}</p>
                        {category.categories?.map((subcategory: Category) =>
                            <option key={subcategory.id}>{subcategory.name}</option>
                        )}
                    </div>
                )}
            </select>
            */}
}

