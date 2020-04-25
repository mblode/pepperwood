import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

class PrimaryNav extends Component {
    render() {
        const { user } = this.props.user;

        let content;

        const signOut = (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            this.props.history.push('/');
        };

        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            <a
                className='dropdown-toggle nav-link'
                href='/'
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}>
                {children}
            </a>
        ));

        if (user == null) {
            content = (
                <Fragment>
                    <li className='nav-item'>
                        <Link to='/register' className='btn btn-outline-primary'>
                            Sign up
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/login' className='btn btn-primary'>
                            Sign in
                        </Link>
                    </li>
                </Fragment>
            );
        } else {
            content = (
                <Fragment>
                    <Dropdown alignRight>
                        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
                            {user.username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to='/account' className='dropdown-item'>
                                Account
                            </Link>
                            <a href='/' onClick={signOut} className='dropdown-item'>
                                Sign out
                            </a>
                        </Dropdown.Menu>
                    </Dropdown>
                </Fragment>
            );
        }

        return (
            <Navbar bg='light' expand='lg' className='bg-white shadow-sm'>
                <Link to='/' className='navbar-brand'>
                    Pepperwood
                </Link>

                <Nav className='ml-auto'>{content}</Nav>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default withRouter(connect(mapStateToProps)(PrimaryNav));
