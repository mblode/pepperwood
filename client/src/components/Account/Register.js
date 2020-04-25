import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userAction';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('*Username is required'),
    email: Yup.string().email().required('*Email is required'),
    password: Yup.string().required('*Password is required'),
});

class Register extends Component {
    render() {
        const { error, isAuthenticating } = this.props.user;

        let content;

        if (error) {
            content = <p>{error}</p>;
        } else if (isAuthenticating) {
            content = (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            );
        }

        return (
            <section className='form-signin-wrap'>
                <Helmet>
                    <title>Pepperwood &middot; Sign up</title>
                </Helmet>

                <Row>
                    <Col>
                        <h2>Create your account</h2>

                        <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                password: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                this.props.dispatch(registerUser({ user: values }));
                                this.props.history.push('/');
                            }}>
                            {({ isSubmitting, errors, touched }) => (
                                <Form className='form-signin'>
                                    <div className='form-group'>
                                        <div className='form-label-wrap'>
                                            <label htmlFor='username'>Username</label>
                                        </div>
                                        <Field
                                            type='text'
                                            name='username'
                                            placeholder='Username'
                                            className={`form-control ${
                                                touched.username && errors.username ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='email' className='invalid-feedback' />
                                    </div>

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

                                    <div className='form-group'>
                                        <div className='form-label-wrap'>
                                            <label htmlFor='password'>Password</label>
                                        </div>
                                        <Field
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            className={`form-control ${
                                                touched.password && errors.password ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <ErrorMessage component='div' name='password' className='invalid-feedback' />
                                    </div>

                                    <button type='submit' className='btn btn-primary btn-block' disabled={isSubmitting}>
                                        Sign up
                                    </button>

                                    <div className='mt-4'>
                                        Already have an account? <Link to='/login'>Sign in</Link>.
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        {content}
                    </Col>
                </Row>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(Register);
