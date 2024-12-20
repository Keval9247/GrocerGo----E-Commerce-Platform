import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { Input, ButtonC } from '../components/index';
import { signup as signupAction } from '../store/thunks/authThunks';
import { sha256 } from 'js-sha256';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [role, setRole] = useState('user');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const signup = async (data) => {
        try {
            const hashedPassword = sha256(data.password);
            const response = await dispatch(signupAction({
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                gender: data.gender,
                phone: data.phone,
                address: data.address,
            }));

            if (!response.payload || !response.payload.user) {
                throw new Error('Failed to create account');
            }

            localStorage.setItem('token', response.payload.user.token);
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center mt-28">
            <Box className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md flex flex-col">
                <Box className="flex items-center justify-center mb-4">
                    <Typography variant="h5" className="text-indigo-600 font-extrabold ml-2 px-3" fontWeight={700}>
                        Get started absolutely free
                    </Typography>
                </Box>
                <Typography variant="subtitle1" className="text-gray-600 text-center mb-4">
                    Already have an account? <RouterLink to='/login' className="text-indigo-500 hover:text-indigo-700 font-semibold">Sign In</RouterLink>
                </Typography>
                <form onSubmit={handleSubmit(signup)} className="space-y-6">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input
                                label="Username"
                                fullWidth
                                {...register('name', { required: 'Name is required' })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Email"
                                fullWidth
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Phone"
                                fullWidth
                                type="tel"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid phone number' }
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Password"
                                fullWidth
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Confirm Password"
                                fullWidth
                                type="password"
                                {...register('confirm_password', {
                                    required: 'Confirm password is required',
                                    validate: value => value === watch('password') || 'Passwords do not match'
                                })}
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Address"
                                fullWidth
                                {...register('address', { required: 'Address is required' })}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" fullWidth>
                                <Typography className="text-gray-700 font-medium mb-2">Gender</Typography>
                                <RadioGroup row name="gender" defaultValue="male">
                                    <FormControlLabel value="male" control={<Radio />} label="Male" {...register('gender')} />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" {...register('gender')} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" fullWidth>
                                <Typography className="text-gray-700 font-medium mb-2">Choose Your Role</Typography>
                                <RadioGroup row name="role" value={role} onChange={handleRoleChange}>
                                    <FormControlLabel value="user" control={<Radio />} label="User" {...register('role')} />
                                    <FormControlLabel value="admin" control={<Radio />} label="Admin" disabled {...register('role')} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonC type="submit" className="bg-indigo-600 w-full text-white mt-3 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
                                Register
                            </ButtonC>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </div>
    );
};

export default SignUp;
