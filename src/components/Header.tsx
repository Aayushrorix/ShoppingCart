import { useNavigate } from 'react-router-dom'
import './css/Header.css'
import { useGetCartCountQuery, useLogoutUserMutation } from '../state/slices/ShoppingCartSlices'
import { useEffect, useState } from 'react'

function Header() {

    const navigate = useNavigate()
    const [logoutUser] = useLogoutUserMutation()
    const [cartCount, setCartCount] = useState<number>(0)

    const { data } = useGetCartCountQuery(
        {
            // Define your headers here
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    );
    // console.log("data====> ",data)
    
    useEffect(()=>{
        if(data){
            setCartCount(data.data.cartCount)
        }
    },[data])

    function userLogout(){
        logoutUser(
            {
                // Define your headers here
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        )
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="header-main">
            <span onClick={()=>navigate('/')}>Home</span>
            <button className='btn-logout' onClick={userLogout}>Logout</button>
            {cartCount!==0 && 
            <span className='cart-count'>{cartCount}</span>
            }
            <span>
                <img className='cart-icon' src='src/assets/cart.png' onClick={()=>navigate('/cart')} alt='Cart'></img>
            </span>
        </div>
    )
}

export default Header