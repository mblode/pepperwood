import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import dashboard from './dashboardReducer';
import report from './reportReducer';
import schedule from './scheduleReducer';
import user from './userReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        dashboard,
        report,
        schedule,
        user
    });
