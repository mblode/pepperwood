import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../Home/Dashboard';
import Home from '../Home/Home';

export default function PrivateRoute({ authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                authed !== null ? (
                    <Dashboard />
                ) : (
                    <Home />
                )
            }
        />
    );
}
