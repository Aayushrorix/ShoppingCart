import { useNavigate } from 'react-router-dom'
import './css/Header.css'
import { useGetCartCountQuery, useLogoutUserMutation } from '../state/slices/ShoppingCartSlices'
import { useEffect, useState } from 'react'

function Header() {

    const navigate = useNavigate()
    const [logoutUser] = useLogoutUserMutation()
    const [cartCount, setCartCount] = useState<number>(0)

    const { data:count } = useGetCartCountQuery(
        // {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        // }
    );
    
    useEffect(()=>{
        if(count){
            setCartCount(count.data.cartCount)
        }
    },[count])

    function userLogout(){
        logoutUser(
            // {
            //     'Content-Type': 'application/json',
            //     Authorization: `Bearer ${localStorage.getItem('token')}`,
            // }
        )
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="header-main">
            <button className='home-tag' onClick={()=>navigate('/')}>Home</button>
            <button className='btn-logout' onClick={userLogout}>Logout</button>
            {cartCount!==0 && 
            <span className='cart-count'>{cartCount}</span>
            }
            <span>
                <img className='cart-icon' onClick={()=>navigate('/cart')} src='src/assets/cart.png' alt='Cart'></img>
            </span>
        </div>
    )
}

export default Header