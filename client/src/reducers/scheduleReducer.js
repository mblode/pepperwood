import { handleActions } from 'redux-actions';

export default handleActions(
    {
        FETCH_SCHEDULES_SUCCESS: (state, action) => ({
            ...state,
            isFetching: false,
            schedules: action.payload.data
        }),
        FETCH_SCHEDULES_FAILURE: (state, action) => ({
            ...state,
            isFetching: false,
            isUpdating: false,
            error: action.payload.error
        }),
        FETCH_SCHEDULES_STARTED: state => ({
            ...state,
            isFetching: true
        }),
        FETCH_SCHEDULE_SUCCESS: (state, action) => ({
            ...state,
            isFetching: false,
            schedule: action.payload.data
        }),
        FETCH_SCHEDULE_FAILURE: (state, action) => ({
            ...state,
            isFetching: false,
            isUpdating: false,
            error: action.payload.error
        }),
        FETCH_SCHEDULE_STARTED: state => ({
            ...state,
            isFetching: true
        }),
        DELETE_SCHEDULE_SUCCESS: (state, action) => ({
            ...state,
            schedules: state.schedules.filter(item => item._id !== action.payload.data),
            isUpdating: false
        }),
        UPDATE_SCHEDULE_STARTED: state => ({
            ...state,
            isUpdating: true
        }),
        UPDATE_SCHEDULE_SUCCESS: state => ({
            ...state,
            isUpdating: false
        }),
        POST_SCHEDULE_SUCCESS: (state, action) => ({
            ...state,
            isUpdating: false,
            schedules: [...state.schedules, action.payload.data]
        })
    },
    {
        isFetching: false,
        isUpdating: false,
        schedules: [],
        schedule: {},
        error: null
    }
);
