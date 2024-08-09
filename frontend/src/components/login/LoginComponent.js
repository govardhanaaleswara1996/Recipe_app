import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import '../../assets/styles/login.css';
import loginBg from '../../assets/images/2147922791.jpg'
import { NavLink, Link } from 'react-router-dom';
import { useLogin } from '../../services/Login/Login';
import headerLogo from '../../assets/images/spicysmiles.png';


const LoginComponent = () => {
    const { submitLogin } = useLogin();

    const validationSchema = yup.object({
        userName: yup
            .string('Enter your UserName')
            .required('UserName is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
    });
   
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            console.log("Logged In");
            // <NavLink to="/dashboard"></NavLink>
            submitLogin(values);
        },
    });

    return (
        
        <div className='outerContainer' style={{
            backgroundImage: `url(${loginBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className='loginContainer'>
            <img src={headerLogo} alt="SpicySmiles Logo" className='logo'/>
                <div className='loginForm'>
                    <h2>Sign in</h2>
                    {/* <h3>Recipe Application</h3> */}
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='textField'
                            fullWidth
                            variant="outlined"
                            id="userName"
                            name="userName"
                            placeholder="Email"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField className='textField'
                            fullWidth
                            variant="outlined"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button className="loginButton" color="secondary" variant="contained" fullWidth type="submit">
                            Sign in
                        </Button>
                    </form>
                    <h4>Do you have a account? <NavLink to="/register">Sign Up</NavLink></h4>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;





