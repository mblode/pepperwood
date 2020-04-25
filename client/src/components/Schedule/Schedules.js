import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSchedules } from '../../actions/scheduleAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ScheduleItem from './ScheduleItem';

class Schedules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
        };
    }

    componentDidMount() {
        let page = 1;

        if (this.props.match.params.page !== undefined) {
            page = this.props.match.params.page;
        }

        this.props.dispatch(fetchSchedules(page));
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            let page = 1;

            if (this.props.match.params.page !== undefined) {
                page = this.props.match.params.page;
            }

            this.props.dispatch(fetchSchedules(page));
        }
    }

    render() {
        const { error, isFetching, schedules } = this.props.schedule;

        let content;

        if (error) {
            content = <p>Failed to load schedules</p>;
        } else if (isFetching) {
            content = (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            );
        } else if (schedules.length === 0) {
            content = <p>No schedules found</p>;
        } else {
            content = (
                <div>
                    {schedules.map((item) => (
                        <ScheduleItem key={item._id} item={item}></ScheduleItem>
                    ))}
                </div>
            );
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Pepperwood &middot; Schedule</title>
                </Helmet>

                <div className='row'>
                    <div className='col'>
                        <div className='heading-button'>
                            <h1>Schedules</h1>

                            <div>
                                <Link to='/schedules/add' className='btn btn-primary'>
                                    Add schedule
                                </Link>
                            </div>
                        </div>

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

export default withRouter(connect(mapStateToProps)(Schedules));
