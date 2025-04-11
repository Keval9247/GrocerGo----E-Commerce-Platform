import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sha256 } from 'js-sha256';
import { Button, Grid, IconButton, InputAdornment, Typography, Box, Divider, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../store/thunks/authThunks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginIcon from '@mui/icons-material/Login';
import { ButtonC, Input } from '../components';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebaseConfig';
import OtpBox from '../components/otpbox/OtpBox';
import { useAuth0 } from '@auth0/auth0-react';
import { auth0LoginSuccess } from '../store/slice/AuthSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isOtpTabVisible, setIsOtpTabVisible] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (isOtpTabVisible) setIsOtpTabVisible(false);
    }, []);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (data) => {
        setIsLoginLoading(true);
        try {
            const response = await dispatch(login({ email: data.email, password: data.password }));

            const isVerified = response?.payload?.user?.isVerified;
            const userRole = response?.payload?.user?.role;

            localStorage.setItem("UserEmail", JSON.stringify(response?.payload?.user));
            localStorage.setItem('token', response?.payload?.token);
            if (response?.payload.error) {
                toast.error(response?.payload.error)
                return;
            }

            if (!isVerified) {
                toast.info("User is not verified. Please enter the OTP sent to your email.");
                setIsOtpTabVisible(true);
            } else {
                toast.success("Login Successful");
                navigate(userRole === 'admin' ? '/admin' : '/user/products?category=All');
            }
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setIsLoginLoading(false);
        }
    };

    if (isLoginLoading) {
        return (
            <Box className="flex justify-center items-center w-full h-screen">
                <CircularProgress size={50} />
            </Box>
        )
    }

    // useEffect(() => {
    //     const storeAuthToken = async () => {
    //         if (isAuthenticated) {
    //             try {
    //                 const token = await getAccessTokenSilently();
    //                 const auth0User = user; // Auth0 user info

    //                 // Dispatch to Redux
    //                 dispatch(auth0LoginSuccess({ token, user: auth0User }));

    //                 toast.success("Login Successful with SSO");
    //                 navigate(auth0User?.role === 'admin' ? '/admin' : '/user/products?category=All');
    //             } catch (error) {
    //                 console.error("Token retrieval error", error);
    //                 toast.error("Failed to login with SSO");
    //             }
    //         }
    //     };

    //     storeAuthToken();
    // }, [isAuthenticated]);


    const handleGoogleLogin = async () => {
        setIsLoginLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = result.user.accessToken;

            localStorage.setItem('token', token);
            toast.success('Login Successful');
            navigate('/user');
        } catch (error) {
            toast.error(error.message || 'Google login failed');
            setErrorMessage(error.message || 'Google login failed');
        }
        setIsLoginLoading(false);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center mt-28">
            {isOtpTabVisible ? (
                <OtpBox />
            ) : (
                <Box className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md flex flex-col">
                    <Box className="flex items-center justify-center mb-4">
                        <LoginIcon className="text-indigo-600" fontSize="large" />
                        <Typography variant="h5" className="text-indigo-600 font-extrabold ml-2 px-3" fontWeight={700}>
                            Get started with GrocerGo !
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" className="text-gray-600 text-center mb-4">
                        Don't have an account?{' '}
                        <RouterLink to='/signup' className="text-indigo-500 hover:text-indigo-700 font-semibold">
                            Register
                        </RouterLink>
                    </Typography>
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Input
                                    label="Email Address"
                                    fullWidth
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    label="Password"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 4, message: 'Password must be at least 4 characters' },
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="flex justify-end">
                                    <RouterLink to='/forgot-password' className="text-indigo-500 hover:text-indigo-700 font-semibold">
                                        Forgot Password?
                                    </RouterLink>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonC type="submit" className="bg-indigo-600 w-full text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300" disabled={isLoginLoading}>
                                    {isLoginLoading ? (
                                        <div className="flex items-center justify-center">
                                            <CircularProgress size={20} color="inherit" className="mr-2" />
                                            Logging in...
                                        </div>
                                    ) : ("Login")
                                    }
                                </ButtonC>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() => loginWithRedirect()}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        mt: 2,
                                        '&:hover': {
                                            backgroundColor: '#00264d',
                                            color: '#ffffff',
                                        },
                                    }}
                                >
                                    Login with SSO (Auth0)
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider className="flex items-center justify-center my-4">
                                    <Typography variant="h6" className="text-gray-600 font-extrabold">
                                        OR
                                    </Typography>
                                </Divider>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={handleGoogleLogin}
                                    sx={{
                                        mt: 2,
                                        '&:hover': {
                                            backgroundColor: '#00264d',
                                            color: '#ffffff',
                                        },
                                        '&:active': {
                                            backgroundColor: '#004080',
                                            color: '#ffffff',
                                        },
                                    }}
                                >
                                    Login with Google
                                </Button>
                            </Grid>
                            {errorMessage && (
                                <Grid item xs={12}>
                                    <Typography color="error" align="center">{errorMessage}</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </Box>
            )}
        </div>
    );
}

export default Login;
