import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('*Email is required'),
});

class ForgotPassword extends Component {
    render() {
        return (
            <section className='form-signin-wrap'>
                <Helmet>
                    <title>Pepperwood &middot; Forgot Password</title>
                </Helmet>

                <div className='row'>
                    <div className='col'>
                        <h2>Forgot your password?</h2>

                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                // this.props.dispatch(postSchedule(values));
                            }}>
                            {({ isSubmitting, errors, touched }) => (
                                <Form className='form-signin'>
                                    <div className='form-group'>
                                        <div className='form-label-wrap'>
                                            <label htmlFor='email'>Email address</label>
                                        </div>
                                        <Field
                                            type='email'
                                            name='email'
                                            placeholder='Email address'
                                            className={`form-control ${
                                                touched.email && errors.email ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='email' className='invalid-feedback' />
                                    </div>

                                    <button type='submit' className='btn btn-primary btn-block' disabled={isSubmitting}>
                                        Reset password
                                    </button>

                                    <div className='mt-4'>
                                        Or return to <Link to='/login'>login</Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(ForgotPassword);
