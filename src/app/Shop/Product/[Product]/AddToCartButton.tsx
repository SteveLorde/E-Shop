'use client'


export default function Addbutton( {productid}) {

    function additem() {
        alert(productid)
    }

    return <>
    <button onClick={ () => additem() }>Add To Cart</button>
    </>
}