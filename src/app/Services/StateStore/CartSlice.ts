import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/Services/StateStore/Store'
import {Product} from "@/app/Data/Models/Product";

// Define a type for the slice state
interface CartState {
    items: Product[]
}

// Define the initial state using that type
const initialState: CartState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        AddItem: (state, action : PayloadAction<Product>) => {
            state.items.push(action.payload)
        },
        RemoveItem: (state, action) => {

        },
        clearCart: state => {
            state.items = []
        }
    },
})

export const { AddItem, RemoveItem, clearCart } = cartSlice.actions
export default cartSlice.reducer