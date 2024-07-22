import '../css/Home.css'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import Header from '../Header'
import Products from '../Products'

function Home() {

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
        navigate('/login')
        }
    },[token])

    return (
        <div className="div-home-main">
        {localStorage.getItem('token') && 
        <>
            <Header/>

            <Products/>
        </>
        }

        {!localStorage.getItem('token') && 
        <></>}
        </div>
    )
}

export default Home