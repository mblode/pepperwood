import { createActions } from 'redux-actions';
import axios from '../helpers/axiosConfig';

export const {
    fetchUserSuccess,
    fetchUserFailure,
    fetchUserStarted,
    updateUserStarted,
    updateUserSuccess,
    loginUserSuccess,
    registerUserSuccess
} = createActions(
    {
        FETCH_USER_SUCCESS: (data, type) => ({ data, type }),
        LOGIN_USER_SUCCESS: (data, type) => ({ data, type }),
        REGISTER_USER_SUCCESS: (data, type) => ({ data, type }),
        LOGOUT_USER_SUCCESS: (data, type) => ({ data, type }),
        FETCH_USER_FAILURE: error => ({ error })
    },
    'FETCH_USER_STARTED',
    'UPDATE_USER_STARTED'
);

export const fetchUser = page => {
    return async dispatch => {
        dispatch(fetchUserStarted());

        try {
            const response = await axios.get(`/user`);
            dispatch(fetchUserSuccess(response.data));
        } catch (error) {
            dispatch(fetchUserFailure(error));
        }
    };
};

export const updateUser = (id, data) => {
    return async dispatch => {
        try {
            await axios.put(`/users/${id}`, data);
            dispatch(updateUserSuccess(id));
        } catch (error) {
            dispatch(fetchUserFailure(error));
        }
    };
};

export const registerUser = data => {
    return async dispatch => {
        dispatch(fetchUserStarted());

        try {
            const response = await axios.post(`/user`, data);
            dispatch(registerUserSuccess(response.data));
            localStorage.setItem('token', response.data.user.token);
        } catch (error) {
            dispatch(fetchUserFailure(error));
        }
    };
};

export const loginUser = data => {
    return async dispatch => {
        dispatch(fetchUserStarted());

        try {
            const response = await axios.post(`/user/login`, data);
            dispatch(loginUserSuccess(response.data));
            localStorage.setItem('token', response.data.user.token);
        } catch (error) {
            dispatch(fetchUserFailure(error));
        }
    };
};
