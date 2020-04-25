import { handleActions } from 'redux-actions';

export default handleActions(
    {
        FETCH_USER_SUCCESS: (state, action) => ({
            ...state,
            isAuthenticating: false,
            isUpdating: false,
            user: action.payload.data.user
        }),
        FETCH_USER_FAILURE: (state, action) => ({
            ...state,
            isAuthenticating: false,
            isUpdating: false,
            error: action.payload.error
        }),
        FETCH_USER_STARTED: state => ({
            ...state,
            isAuthenticating: true
        }),
        UPDATE_USER_STARTED: state => ({
            ...state,
            isUpdating: true
        }),
        UPDATE_USER_SUCCESS: state => ({
            ...state,
            isUpdating: false
        }),
        LOGIN_USER_SUCCESS: (state, action) => ({
            ...state,
            isAuthenticating: false,
            user: action.payload.data.user
        }),
        REGISTER_USER_SUCCESS: (state, action) => ({
            ...state,
            isAuthenticating: false,
            user: action.payload.data.user
        }),
        LOGOUT_SUCCESS: (state, action) => ({
            ...state,
            isAuthenticating: false,
            user: null
        })
    },
    {
        isAuthenticating: true,
        isUpdating: false,
        user: null,
        error: null
    }
);
