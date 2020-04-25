import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Spinner } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('*Username is required'),
    email: Yup.string().email().required('*Email is required'),
    bio: Yup.string(),
});

class Account extends Component {
    render() {
        const { error, isAuthenticating, user } = this.props.user;

        if (error) {
            return <p>Failed to load user</p>;
        }

        if (isAuthenticating || user == null) {
            return (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            );
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Pepperwood &middot; Account</title>
                </Helmet>

                <div className='row'>
                    <div className='col'>
                        <div className='heading-button'>
                            <h1>Account</h1>
                        </div>

                        <Formik
                            initialValues={{
                                username: user.username,
                                email: user.email,
                                bio: user.bio,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                this.props.dispatch(updateUser({ user: values }));
                            }}>
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className='form-group'>
                                        <label htmlFor='username'>Username</label>
                                        <Field
                                            name='username'
                                            placeholder='Schedule username'
                                            className={`form-control ${
                                                touched.username && errors.username ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='username' className='invalid-feedback' />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <Field
                                            name='email'
                                            placeholder='Schedule email'
                                            className={`form-control ${
                                                touched.email && errors.email ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='email' className='invalid-feedback' />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='bio'>Bio</label>
                                        <Field
                                            as='textarea'
                                            name='bio'
                                            placeholder='Bio'
                                            className={`form-control ${touched.bio && errors.bio ? 'is-invalid' : ''}`}
                                        />
                                        <ErrorMessage component='div' name='bio' className='invalid-feedback' />
                                    </div>

                                    <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                                        Save user
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

export default connect(mapStateToProps)(Account);
