import { useEffect, useState } from 'react';
import { useGetCartProductsQuery, useAddToCartMutation, useReduceFromCartMutation } from '../../state/slices/ShoppingCartSlices';
import '../css/Cart.css'
import Header from '../Header'

function Cart() {

    const [cartProducts, setCartProducts] = useState<any[]>([])
    const [cartTotalPrice, setCartTotalPrice] = useState<number>(0)

    const [addToCart] = useAddToCartMutation()
    const [reduceFromCart] = useReduceFromCartMutation()

    const { data } = useGetCartProductsQuery(
        {
            // Define your headers here
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    );

    useEffect(()=>{
        if(data){
          console.log("Prouducts : ",data)
          setCartProducts(data.data.cartData)
          setCartTotalPrice(data.data.cartTotalPrice)
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

    function clickReduceToCart(pid:string){
        const header = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
        const productDetail = {
            pid: pid,
        }
        reduceFromCart({header:header,productDetail:productDetail})
    }

    return (
        <>
            <div className='div-cart-main'>
                <Header/>

                {cartProducts && 
                    <>
                        <div className="products-container">
                            {cartProducts.map((product:any,index:number)=>(
                                <div key={index} className='div-product'>
                                    <div>{product.product.name}</div>
                                    <img className="product-img" src={`http://127.0.0.1:8000/media/${product.product.image}`}></img>
                                    <div>Price : {product.product.price}</div>
                                    <div>Qty : {product.productCart.product_count}
                                        <button onClick={()=>clickAddToCart(product.product.pid)}>+</button>
                                        <button onClick={()=>clickReduceToCart(product.product.pid)}>-</button>
                                    </div>
                                    <div>Product Total : {product.productCart.product_total}</div>
                                </div>
                            ))}
                        </div>
                        Total Price : {cartTotalPrice}
                    </>
                }
            </div>
        </>
    )
}

export default Cart