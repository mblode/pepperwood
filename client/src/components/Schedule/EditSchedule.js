import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSchedule, updateSchedule, deleteSchedule } from '../../actions/scheduleAction';
import { Helmet } from 'react-helmet';
import { Spinner } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';
import MapDirections from './MapDirections';
import DayCheckbox from './DayCheckbox';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(1, '*Title must have at least 1 characters')
        .max(100, "*Title can't be longer than 100 characters")
        .required('*Title is required'),
    hour: Yup.number().max(23, "*Hour can't be greater than 23").required('*Hour is required'),
    minute: Yup.number().max(59, "*Minute can't be greater than 59").required('*Minute is required'),
    days: Yup.array().min(1, '*Days must have at least 1 selected').required('*Days are required'),
});

class EditSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: '',
            destination: '',
        };

        this.handleDirections = this.handleDirections.bind(this);
        this.del = this.del.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(fetchSchedule(id));
    }

    handleDirections = (data) => {
        this.setState(() => ({
            origin: data.origin,
            destination: data.destination,
        }));
    };

    del = () => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.props.dispatch(deleteSchedule(this.props.schedule.schedule._id));
            this.props.history.push('/schedules');
        }
    };

    render() {
        const { error, isFetching, schedule } = this.props.schedule;

        if (error) {
            return <p>Failed to load schedule</p>;
        }

        if (isFetching) {
            return (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            );
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Pepperwood &middot; {`${schedule.title}`}</title>
                </Helmet>

                <div className='row'>
                    <div className='col'>
                        <div className='heading-button'>
                            <h1>Edit schedule</h1>

                            <div>
                                <button className='btn btn-danger' onClick={this.del}>
                                    Delete
                                </button>
                            </div>
                        </div>

                        <Formik
                            initialValues={{
                                title: schedule.title,
                                hour: schedule.hour,
                                minute: schedule.minute,
                                days: schedule.days,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                this.props.dispatch(updateSchedule(schedule._id, values));
                            }}>
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className='form-group'>
                                        <label htmlFor='title'>Title</label>
                                        <Field
                                            name='title'
                                            placeholder='Schedule title'
                                            className={`form-control ${
                                                touched.title && errors.title ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='title' className='invalid-feedback' />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='title'>Arrive by hour</label>
                                        <Field
                                            name='hour'
                                            placeholder='Schedule hour'
                                            className={`form-control ${
                                                touched.hour && errors.hour ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='hour' className='invalid-feedback' />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='minute'>Arrive by minute</label>
                                        <Field
                                            name='minute'
                                            placeholder='Schedule minute'
                                            className={`form-control ${
                                                touched.minute && errors.minute ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='minute' className='invalid-feedback' />
                                    </div>

                                    <div>
                                        <div>
                                            <DayCheckbox name='days' value='0' title='Monday' label='M' />
                                            <DayCheckbox name='days' value='1' title='Tuesday' label='T' />
                                            <DayCheckbox name='days' value='2' title='Wednesday' label='W' />
                                            <DayCheckbox name='days' value='3' title='Thursday' label='T' />
                                            <DayCheckbox name='days' value='4' title='Friday' label='F' />
                                            <DayCheckbox name='days' value='5' title='Saturday' label='S' />
                                            <DayCheckbox name='days' value='6' title='Sunday' label='S' />
                                        </div>

                                        <ErrorMessage component='div' name='days' className='invalid-feedback' />
                                    </div>

                                    <MapDirections handleDirections={this.handleDirections} />

                                    <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                                        Save schedule
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default withRouter(connect(mapStateToProps)(EditSchedule));
