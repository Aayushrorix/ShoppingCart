import { useNavigate } from 'react-router-dom'
import './css/Header.css'
import { useGetCartCountQuery, useLogoutUserMutation, useGetProfileQuery } from '../state/slices/ShoppingCartSlices'
import { useEffect, useState } from 'react'

function Header() {

    const navigate = useNavigate()
    const [logoutUser] = useLogoutUserMutation()
    const [cartCount, setCartCount] = useState<number>(0)
    const [userProfile,setUserProfile] = useState<any>({displayName:'',profileImage:''})

    const { data:count } = useGetCartCountQuery();
    const { data:profile } = useGetProfileQuery();
    
    useEffect(()=>{
        if(count){
            setCartCount(count.data.cartCount)
        }
    },[count])

    useEffect(()=>{
        if(profile){
            setUserProfile(profile.data)
        }
    },[profile])

    function userLogout(){
        logoutUser()
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

            <span>
                {userProfile.profileImage && 
                    <img className='profile-icon' onClick={()=>navigate('/profile')} src={`http://127.0.0.1:8000/media/${userProfile.profileImage}`} alt='Profile'></img>
                }
                {!userProfile.profileImage && 
                <img className='profile-icon' onClick={()=>navigate('/profile')} src='profileimg.jpg' alt='Cart'></img>
                }
            </span>

            <span className='profile-name'>
                {userProfile.displayName}
            </span>
        </div>
    )
}

export default Header