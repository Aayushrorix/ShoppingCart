import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../css/LoginPage.css'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    const navigate = useNavigate()

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
        onSubmit: (values, { resetForm }) => {
            console.log("Form Submitted", values);
            resetForm();
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