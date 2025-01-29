import { useDispatch } from 'react-redux';
import { login, signup } from '../slice/AuthSlice';

let dispatch = useDispatch()

export const loginUser = async (credentials) => {
    try {
        const result = await dispatch(login(credentials));
        return result.payload;
    } catch (error) {
        throw error;
    }
};

export const signupUser = async (userData) => {
    try {
        const result = await dispatch(signup(userData));
        return result.payload;
    } catch (error) {
        throw error;
    }
};