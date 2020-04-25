import { createActions } from 'redux-actions';
import axios from '../helpers/axiosConfig';

export const {
    fetchSchedulesSuccess,
    fetchSchedulesFailure,
    fetchSchedulesStarted,
    fetchScheduleSuccess,
    fetchScheduleFailure,
    fetchScheduleStarted,
    deleteScheduleSuccess,
    updateScheduleStarted,
    updateScheduleSuccess,
    postScheduleSuccess
} = createActions(
    {
        FETCH_SCHEDULES_SUCCESS: data => ({ data }),
        FETCH_SCHEDULES_FAILURE: error => ({ error }),
        FETCH_SCHEDULE_SUCCESS: data => ({ data }),
        FETCH_SCHEDULE_FAILURE: error => ({ error }),
        DELETE_SCHEDULE_SUCCESS: data => ({ data }),
        POST_SCHEDULE_SUCCESS: data => ({ data })
    },
    'FETCH_SCHEDULES_STARTED',
    'FETCH_SCHEDULE_STARTED',
    'UPDATE_SCHEDULE_STARTED',
    'UPDATE_SCHEDULE_SUCCESS'
);

export const fetchSchedules = page => {
    return async dispatch => {
        dispatch(fetchSchedulesStarted());

        try {
            const response = await axios.get(`/schedules?page=${page}`);
            dispatch(fetchSchedulesSuccess(response.data));
        } catch (error) {
            dispatch(fetchSchedulesFailure(error));
        }
    };
};

export const fetchSchedule = id => {
    return async dispatch => {
        dispatch(fetchScheduleStarted());

        try {
            const response = await axios.get(`/schedules/${id}`);
            dispatch(fetchScheduleSuccess(response.data));
        } catch (error) {
            dispatch(fetchScheduleFailure(error));
        }
    };
};

export const deleteSchedule = id => {
    return async dispatch => {
        dispatch(updateScheduleStarted());

        try {
            await axios.delete(`/schedules/${id}`);
            dispatch(deleteScheduleSuccess(id));
        } catch (error) {
            dispatch(fetchScheduleFailure(error));
        }
    };
};

export const updateSchedule = (id, data) => {
    return async dispatch => {
        dispatch(updateScheduleStarted());

        try {
            await axios.put(`/schedules/${id}`, data);
            dispatch(updateScheduleSuccess(id));
        } catch (error) {
            dispatch(fetchScheduleFailure(error));
        }
    };
};

export const postSchedule = data => {
    return async dispatch => {
        dispatch(updateScheduleStarted());

        try {
            const response = await axios.post(`/schedules`, data);
            dispatch(postScheduleSuccess(response.data));
        } catch (error) {
            dispatch(fetchScheduleFailure(error));
        }
    };
};
