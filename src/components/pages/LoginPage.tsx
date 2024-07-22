import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../css/LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../state/slices/ShoppingCartSlices'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function LoginPage() {

    const loginDetails:any = useSelector((state:any) => state)
    // const [res,setRes] = useState<any>()
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [errMsg, setErrMsg] = useState('')

    useEffect(()=>{
        console.log(loginDetails)
    },[loginDetails])

    const navigate = useNavigate()

    console.log(localStorage.getItem('token'))

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token])
    

    // const [loginUser, { isLoading: loginLoading, isSuccess:  loginSuccess}] = useLoginUserMutation();
    const [loginUser] = useLoginUserMutation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .required("Email is Required"),
            password: Yup.string()
            .required("Password is Required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log("Form Submitted", values);
            const nres = await loginUser(
                {
                    email:values.email,
                    password:values.password
                }
            )
            // setRes(nres)
            console.log("===> Login Details => ",loginDetails,"data =>",nres)
            if(nres.error){
                console.log(nres.error.data)
                setErrMsg(nres.error.data.message)
            }

            if(nres.data.data.token){
                localStorage.setItem('token',nres.data.data.token)
                setToken(nres.data.data.token)
            }
            resetForm();
            navigate('/')
        }
    })

    function goSignup(){
        navigate('/signUp')
    }


    return (
        <>
            {/* <div>LoginPage</div> */}

            <div className='login-form-div'>
                <form className='login-form' onSubmit={formik.handleSubmit}>
                    <div className='form-heading'>Login</div>
                    
                    <div className="input-form-name-label">Email</div>
                    <input className='input-box' type='email' name='email' placeholder='Email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                    <div className="input-form-name-label">Password</div>
                    <input className='input-box' type='password' name='password' placeholder='Password' onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                    {errMsg && 
                    <div style={{color:'rgb(14 7 6)'}}>{errMsg}</div>
                    }

                    <div>
                        <button className='login-btn' type='submit'>Login</button>
                    </div>

                    <div className='note-msg'>If not registered please <span onClick={goSignup} className='signup-link'>SignUp</span> first</div>

                </form>
            </div>
        </>
    )
}

export default LoginPage