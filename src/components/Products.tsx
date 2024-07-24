import { useEffect, useState } from "react";
import { useAddToCartMutation,useGetCartCountQuery,useGetCartProductsQuery ,useGetProductsQuery, useRemoveFromCartMutation } from "../state/slices/ShoppingCartSlices";
import './css/Products.css'
import { useNavigate } from "react-router-dom";
import { CartData, Productsp } from "../models/shoppingModels";

function Products() {

    const [products, setProducts] = useState<Productsp[]>([])
    const [cartProducts, setCartProducts] = useState<CartData[]>([])
    const [cartProductIds, setCartProductIds] = useState<string[]|null>()
    const [cartCount, setCartCount] = useState<number>(0)
    const navigate = useNavigate()

    const { data:count } = useGetCartCountQuery();
    
    useEffect(()=>{
        if(count){
            if(count.status===401){
                localStorage.removeItem('token')
                navigate('/login')
            }
            setCartCount(count.data.cartCount)
        }
    },[count])

    const { data:allproducts } = useGetProductsQuery();

    const [addToCart] = useAddToCartMutation()
    const [removeFromCart] = useRemoveFromCartMutation()

    useEffect(()=>{
        if(allproducts){
            console.log("=====> stattu => ",allproducts.status)
            if(allproducts.status===401){
                localStorage.clear()
                navigate('/login')
            }
          console.log("Prouducts : ",allproducts)
          setProducts(allproducts.data.products)
        }
    },[allproducts])

    const { data:allcartProducts } = useGetCartProductsQuery();

    useEffect(()=>{
        if(allcartProducts){
            if(allcartProducts.status===401){
                localStorage.clear()
                navigate('/login')
            }
          console.log("Prouducts : ",allcartProducts)
          setCartProducts(allcartProducts.data.cartData)
        }
    },[allcartProducts])

    useEffect(()=>{
        const cartpids = []
        for (let i = 0; i < cartProducts.length; i++){
            cartpids.push(cartProducts[i].product.pid)
        }
        setCartProductIds(cartpids)
    },[cartProducts])


    function clickAddToCart(pid:string){
        const productDetail = {
            pid: pid,
        }
        addToCart({productDetail:productDetail})
    }

    function clickRemoveFormCart(pid:string){
        const productDetail = {
            pid: pid,
        }
        removeFromCart({productDetail:productDetail})
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
                                <div className="div-img">
                                    <img className="product-img" src={`http://127.0.0.1:8000/media/${product.image}`}></img>
                                </div>
                                <div className="price-tag">Price : {product.price} ₹</div>
                                <div>
                                    <button disabled={!(cartCount===0 || !cartProductIds?.includes(product.pid))} onClick={()=>clickAddToCart(product.pid)}>Add to Cart</button>
                                    <button disabled={cartCount===0 || !cartProductIds?.includes(product.pid)} onClick={()=>clickRemoveFormCart(product.pid)}>Remove from Cart</button>
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