import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../Navigation/PrivateRoute';
import PrivateHome from '../Navigation/PrivateHome';
import Account from '../Account/Account';
import Reports from '../Report/Reports';
import AddReport from '../Report/AddReport';
import EditReport from '../Report/EditReport';
import Schedules from '../Schedule/Schedules';
import AddSchedule from '../Schedule/AddSchedule';
import EditSchedule from '../Schedule/EditSchedule';
import NoMatch from '../Navigation/NoMatch';
import Login from '../Account/Login';
import Register from '../Account/Register';
import ForgotPassword from '../Account/ForgotPassword';

class Main extends Component {
    render() {
        return (
            <div className='main col col-md-9 col-xl-8 offset-md-3'>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/forgot-password' component={ForgotPassword} />

                    <PrivateHome exact path='/' authed={this.props.user} />

                    <PrivateRoute exact path='/reports' component={Reports} authed={this.props.user} />
                    <PrivateRoute exact path='/reports/add' component={AddReport} authed={this.props.user} />
                    <PrivateRoute exact path='/reports/:id' component={EditReport} authed={this.props.user} />
                    <PrivateRoute exact path='/schedules' component={Schedules} authed={this.props.user} />
                    <PrivateRoute exact path='/schedules/add' component={AddSchedule} authed={this.props.user} />
                    <PrivateRoute exact path='/schedules/:id' component={EditSchedule} authed={this.props.user} />
                    <PrivateRoute exact path='/account' component={Account} authed={this.props.user} />

                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user.user });
export default connect(mapStateToProps)(Main);
