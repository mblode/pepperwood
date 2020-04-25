import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteSchedule, updateSchedule } from '../../actions/scheduleAction';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

class ScheduleItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: this.props.item.hidden ? !this.props.item.hidden : true
        };

        this.del = this.del.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

    }

    del = () => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.props.dispatch(deleteSchedule(this.props.item._id));
        }
    };

    handleToggle = event => {
        this.setState({
            toggle: event.target.checked
        });

        let data = {
            hidden: this.state.toggle
        };

        this.props.dispatch(updateSchedule(this.props.item._id, data));
    };

    render() {
        const { item } = this.props;

        return (
            <div>
                <Link to={`/schedules/${item._id}`}>
                    <h3>{item.title}</h3>
                </Link>

                <Form>
                    <Form.Switch
                        id={`hidden-${item._id}`}
                        label=''
                        defaultChecked={this.state.toggle}
                        onChange={this.handleToggle}
                    />
                </Form>

                <button className='btn btn-danger' onClick={this.del}>
                    Delete
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ScheduleItem);
