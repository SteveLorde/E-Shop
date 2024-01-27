import {PurchaseLog} from "@/Data/Models/PurchaseLog";
import {Product} from "@/Data/Models/Product";
import {CartItem} from "@/Data/Models/CartItem";

export function CheckoutResultModal({IsVisible ,purchaselog} : {IsVisible : boolean,purchaselog : PurchaseLog}) {

    const closemodal = () => IsVisible = false

    return <>
        {IsVisible && <div>
            <p>num of items {purchaselog.items.length}</p>
            {purchaselog.items.map( (product : CartItem) =>
                <div key={product.product.id}>
                    <p>name: {product.product.name}</p>
                    <p>quantity: {product.quantity}</p>
                </div>
            )}
            <p>total price {purchaselog.totalamount}  egp</p>
        </div>}
        <button onClick={closemodal}>Close</button>
    </>
}