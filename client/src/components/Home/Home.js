import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Fragment>
            <Helmet>
                <title>Pepperwood &middot; Home</title>
            </Helmet>

            <div className='row'>
                <div className='col'>
                    <h1>Welcome to Pepperwood</h1>

                    <Link to='/register' className='btn btn-primary mr-2'>
                        Sign up
                    </Link>

                    <Link to='/login' className='btn btn-outline-primary'>
                        Sign in
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}
