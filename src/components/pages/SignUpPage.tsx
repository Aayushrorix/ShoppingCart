import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../css/SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import { useSignUpUserMutation } from '../../state/slices/ShoppingCartSlices'
import { useEffect, useState } from 'react'

function SignUpPage() {

    const navigate = useNavigate()

    // const [signUpUser, { isLoading: signUpLoading, isSuccess:  signUpSuccess}] = useSignUpUserMutation();
    const [signUpUser] = useSignUpUserMutation();
    const [token,setToken] = useState(localStorage.getItem('token'))

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token])

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
            .required("First Name is Required"),
            lastName: Yup.string()
            .required("Last Name is Required"),
            email: Yup.string()
            .required("Email is Required"),
            password: Yup.string()
            .required("Password is Required"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log("Form Submitted", values);
            signUpUser(
                {
                    firstName:values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password
                }
            )
            resetForm();
            navigate('/login')
        }
  })

  function goLogin(){
    navigate('/login')
  }

  return (
        <>
            <div className='signup-form-div'>
                <form className='signup-form' onSubmit={formik.handleSubmit}>
                    <div className='form-heading'>SignUp</div>

                    <div className="input-form-name-label">First Name</div>
                    <input className='input-box' type='text' name='firstName' placeholder='First Name' onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                    <div className="input-form-name-label">Last Name</div>
                    <input className='input-box' type='text' name='lastName' placeholder='Last Name' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    
                    <div className="input-form-name-label">Email</div>
                    <input className='input-box' type='email' name='email' placeholder='Email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                    <div className="input-form-name-label">Password</div>
                    <input className='input-box' type='password' name='password' placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                    <div>
                        <button className='signup-btn' type='submit'>SignUp</button>
                    </div>

                    <div className='note-msg'>If already registered please <span onClick={goLogin} className='login-link'>Login</span></div>

                </form>
            </div>
        </>
  )
}

export default SignUpPage