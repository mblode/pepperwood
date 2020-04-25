import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Home, AlertTriangle, Clock } from 'react-feather';

export default function Footer(props) {
    return (
        <footer className='footer'>
            <nav className='footer-nav'>
                <div className='footer-item'>
                    <NavLink exact={true} to='/' className='footer-link' activeClassName='active'>
                        <Home />
                        <span>Home</span>
                    </NavLink>
                </div>

                <div className='footer-item'>
                    <NavLink to='/schedules' className='footer-link' activeClassName='active'>
                        <Clock />
                        <span>Schedules</span>
                    </NavLink>
                </div>

                <div className='footer-item'>
                    <NavLink to='/reports' className='footer-link' activeClassName='active'>
                        <AlertTriangle />
                        <span>Reports</span>
                    </NavLink>
                </div>

                <div className='footer-item'>
                    <NavLink to='/account' className='footer-link' activeClassName='active'>
                        <User />
                        <span>Account</span>
                    </NavLink>
                </div>
            </nav>
        </footer>
    );
}
