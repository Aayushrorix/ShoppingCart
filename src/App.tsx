import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home'
import LoginPage from './components/pages/LoginPage'
import SignUpPage from './components/pages/SignUpPage'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signUp' element={<SignUpPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
