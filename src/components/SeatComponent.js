import React, { Component } from 'react'
import { Form, Input, Button, Label, Col, Row, FormGroup, FormFeedback } from 'reactstrap';
import SeatAllocationView from './SeatAllocationView';
class Seat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            sid: '',
            room: '',
            touched: {
                name: false,
                sid: false,
                room: false,
            }
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postSeatallocation(this.state);
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate = (name, sid, room) => {
        const errors = {
            name: '',
            sid: '',
            room: '',
        }

        if (this.state.touched.name && name.length < 3)
            errors.name = 'Name should be of minimum length of 3 characters';
        else if (this.state.touched.name && name.length > 30)
            errors.name = 'Name should not be greater than 30 characters';
        if (this.state.touched.sid && sid.length === 0)
            errors.sid = 'Specify the sid';
        if (this.state.touched.room && room.length === 0)
            errors.room = 'Specify the Room';

        return errors;

    }

    render() {
        const errors = this.validate(this.state.name, this.state.sid, this.state.room);
        return (
            <div>
                <div className="row">
                    <div className="col-12 container-fluid">
                        <h2 className="feature-heading ">Seat Allocation</h2>
                        <hr className="feature-line" />
                    </div>
                </div>
                <div>
                    <h4>Student's Seat Allocation</h4>
                </div>
                <div >
                    <Form className="myForm" onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="name">Student Name</Label>
                                    <Input required type="text" name="name" id="name" value={this.state.name} placeholder="Name"
                                        onBlur={this.handleBlur('name')} onChange={this.handleInputChange}
                                        valid={errors.name === ''} invalid={errors.name !== ''} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="sid">Registration No.</Label>
                                    <Input required type="text" name="sid" id="sid" value={this.state.sid} placeholder="Registration Number"
                                        onBlur={this.handleBlur('sid')} onChange={this.handleInputChange}
                                        valid={errors.sid === ''} invalid={errors.sid !== ''} />
                                    <FormFeedback>{errors.sid}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="room">Room No</Label>
                                    <Input required type="text" name="room" id="room" vlaue={this.state.room} placeholder="Room No"
                                        onBlur={this.handleBlur('room')} onChange={this.handleInputChange}
                                        valid={errors.room === ''} invalid={errors.room !== ''} />
                                    <FormFeedback>{errors.room}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        <FormGroup row>
                            <Col md={{ size: 10 }}>
                                <Button type="submit" color="primary">
                                    Save
                                    </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div className="row">
                    <div className="col-12 container-fluid">
                        <SeatAllocationView seats={this.props.seats} isLoading={this.props.isLoading} errMess={this.props.errMess} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Seat;