import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { User, Home, AlertTriangle, Clock } from 'react-feather';

export default function Sidebar(props) {
    return (
        <Col md={{ span: 3 }} xl={{ span: 2 }} className='sidebar'>
            <div className='sidebar-nav'>
                <div className='sidebar-item'>
                    <NavLink exact={true} to='/' className='sidebar-link' activeClassName='active'>
                        <Home />
                        <span>Home</span>
                    </NavLink>
                </div>

                <div className='sidebar-item'>
                    <NavLink to='/schedules' className='sidebar-link' activeClassName='active'>
                        <Clock />
                        <span>Schedules</span>
                    </NavLink>
                </div>

                <div className='sidebar-item'>
                    <NavLink to='/reports' className='sidebar-link' activeClassName='active'>
                        <AlertTriangle />
                        <span>Reports</span>
                    </NavLink>
                </div>

                <div className='sidebar-item'>
                    <NavLink to='/account' className='sidebar-link' activeClassName='active'>
                        <User />
                        <span>Account</span>
                    </NavLink>
                </div>
            </div>
        </Col>
    );
}
