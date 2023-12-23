import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/Services/StateStore/Store'
import {Product} from "@/app/Data/Models/Product";
import {CartItem} from "@/app/Data/Models/CartItem";

// Define a type for the slice state
interface CartState {
    items: CartItem[]
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
            let check : boolean = false
            if (state.items.length == 0) {
                let newcartitem : CartItem = {product: action.payload, quantity: 1}
                state.items.push(newcartitem)
            }
            else {
                for (let i = 0; i < state.items.length; i++) {
                    let cartitem = state.items[i]
                    if (cartitem.product.id == action.payload.id) {
                        cartitem.quantity += 1
                        check = true
                    }
                    if (check) break
                }
                if (!check) {
                    let newcartitem : CartItem = {product: action.payload, quantity: 1}
                    state.items.push(newcartitem)
                }
            }
        },
        RemoveItem: (state, action : PayloadAction<string>) => {
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].product.id == action.payload) {
                    if (state.items[i].quantity > 1) {
                        state.items[i].quantity -= 1
                    }
                    else if (state.items[i].quantity == 1) {
                        state.items = state.items.filter(item => item.product.id !== action.payload)
                    }
                }
            }
        },
        clearCart: state => {
            state.items = []
        }
    },
})

export const { AddItem, RemoveItem, clearCart } = cartSlice.actions
export default cartSlice.reducer