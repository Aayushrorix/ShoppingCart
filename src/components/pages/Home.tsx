import '../css/Home.css'
import { useNavigate } from "react-router-dom"
import { useLogoutUserMutation } from "../../state/slices/ShoppingCartSlices"
import { useEffect } from 'react'


function Home() {

  const navigate = useNavigate()
  const [logoutUser] = useLogoutUserMutation()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[token])

  function goLogin(){
    navigate('/login')
  }

  function userLogout(){
    logoutUser()
    localStorage.removeItem('token')
  }


  return (
    <div className="div-home-main">
      {localStorage.getItem('token') && 
      <>
        <div>Logged In</div>

        <button onClick={userLogout}>Logout</button>
      </>
      }

      {!localStorage.getItem('token') && 
      <></>}
    </div>
  )
}

export default Home