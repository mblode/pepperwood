import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userAction';
import { Spinner } from 'react-bootstrap';
import PrimaryNav from './Navigation/PrimaryNav';
import Main from './Navigation/Main';
import Sidebar from './Navigation/Sidebar';
import Footer from './Navigation/Footer';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    render() {
        const { error, isAuthenticating, user } = this.props.user;

        if (isAuthenticating) {
            return (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            );
        }

        return (
            <Fragment>
                <PrimaryNav />

                <div className='container-fluid'>
                    <div className='row'>
                        <Sidebar />
                        <Main />
                    </div>
                </div>

                <Footer />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(App);
