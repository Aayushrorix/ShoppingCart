import { useEffect, useState } from 'react';
import { useGetCartProductsQuery, useAddToCartMutation, useReduceFromCartMutation } from '../../state/slices/ShoppingCartSlices';
import '../css/Cart.css'
import Header from '../Header'
import { useNavigate } from 'react-router-dom';
import { CartData } from '../../models/shoppingModels';

function Cart() {

    const [cartProducts, setCartProducts] = useState<CartData[]>([])
    const [cartTotalPrice, setCartTotalPrice] = useState<number>(0)
    const [cartCount, setCartCount] = useState<number>(0)
    const navigate = useNavigate()

    const [addToCart] = useAddToCartMutation()
    const [reduceFromCart] = useReduceFromCartMutation()

    const { data:allcartProducts } = useGetCartProductsQuery();

    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
        navigate('/login')
        }
    },[token])


    useEffect(()=>{
        if(allcartProducts){
          console.log("Prouducts : ",allcartProducts)
          setCartProducts(allcartProducts.data.cartData)
          setCartTotalPrice(allcartProducts.data.cartTotalPrice)
          setCartCount(allcartProducts.data.cartCount)
        }
    },[allcartProducts])

    function clickAddToCart(pid:string){
        const productDetail = {
            pid: pid,
        }
        addToCart({productDetail:productDetail})
    }

    function clickReduceToCart(pid:string){
        const productDetail = {
            pid: pid,
        }
        reduceFromCart({productDetail:productDetail})
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
                                    <img className="cart-product-img" src={`http://127.0.0.1:8000/media/${product.product.image}`}></img>
                                    <div>Price : {product.product.price}</div>
                                    <div>Qty : {product.productCart.product_count}
                                        <button onClick={()=>clickAddToCart(product.product.pid)}>+</button>
                                        <button onClick={()=>clickReduceToCart(product.product.pid)}>-</button>
                                    </div>
                                    <div >Product Total : {product.productCart.product_total}</div>
                                </div>
                            ))}
                        </div>
                        {cartCount===0 &&
                            <div className='div-product'>No Items Available in Cart</div>
                        }
                        <h3>
                            <span  className='total-price'>Total Price : {cartTotalPrice}</span>
                        </h3>
                    </>
                }

                
            </div>
        </>
    )
}

export default Cart