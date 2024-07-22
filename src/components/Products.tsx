import { useEffect, useState } from "react";
import { useAddToCartMutation, useGetProductsQuery, useRemoveFromCartMutation } from "../state/slices/ShoppingCartSlices";
import './css/Products.css'

function Products() {

    const [products, setProducts] = useState<any[]>([])

    const { data } = useGetProductsQuery(
        {
            // Define your headers here
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    );

    const [addToCart] = useAddToCartMutation()
    const [removeFromCart] = useRemoveFromCartMutation()

    useEffect(()=>{
        if(data){
          console.log("Prouducts : ",data)
          setProducts(data.data.products)
        }
    },[data])

    function clickAddToCart(pid:string){
        const header = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
        const productDetail = {
            pid: pid,
        }
        addToCart({header:header,productDetail:productDetail})
    }

    function clickRemoveFormCart(pid:string){
        const header = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
        const productDetail = {
            pid: pid,
        }
        removeFromCart({header:header,productDetail:productDetail})
    }


    return (
        <>
            <h2>Products</h2>

            {products && 
                <div className='products-container'>
                    <div className="grid-container">
                        {products.map((product:any,index:number)=>(
                            <div key={index} className='grid-item'>
                                <h3>{product.name}</h3>
                                <img className="product-img" src={`http://127.0.0.1:8000/media/${product.image}`}></img>
                                <div>Price : {product.price} ₹</div>
                                <div>
                                    <button onClick={()=>clickAddToCart(product.pid)}>Add to Cart</button>
                                    <button onClick={()=>clickRemoveFormCart(product.pid)}>Remove from Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>

    )
}

export default Products