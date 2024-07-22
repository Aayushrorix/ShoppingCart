import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home'
import LoginPage from './components/pages/LoginPage'
import SignUpPage from './components/pages/SignUpPage'
import Cart from './components/pages/Cart'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signUp' element={<SignUpPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
