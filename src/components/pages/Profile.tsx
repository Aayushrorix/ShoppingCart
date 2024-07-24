// import React from 'react'

import { useEffect } from "react"
import EditProfile from "../EditProfile"
import Header from "../Header"
import { useNavigate } from "react-router-dom"
// import Products from "../Products"

function Profile() {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[token])
  return (
    <>
            <Header/>

            <EditProfile/>
    </>
  )
}

export default Profile