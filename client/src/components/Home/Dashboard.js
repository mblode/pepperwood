import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../actions/dashboardAction';
import { Helmet } from 'react-helmet';
import { Spinner } from 'react-bootstrap';
import Cards from './Cards/Cards';

class Dashboard extends Component {
    componentDidMount() {
        this.props.dispatch(fetchDashboard());
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.dispatch(fetchDashboard());
        }
    }

    render() {
        const { error, isFetching, dashboard } = this.props.dashboard;

        let content;

        if (error) {
            content = <p>Failed to load dashboard</p>;
        } else if (isFetching) {
            content = (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            );
        } else if (dashboard.length === 0) {
            content = <p>No results found</p>;
        } else {
            content = <Fragment>{dashboard.map((item, index) => Cards(item, index))}</Fragment>;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Pepperwood &middot; Dashboard</title>
                </Helmet>

                <div className='row'>
                    <div className='col'>
                        <h1>Dashboard</h1>

                        {content}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(Dashboard);
