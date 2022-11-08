import React, { Component } from 'react'
import { Form, Input, Button, Label, Col, Row, FormGroup, FormFeedback } from 'reactstrap';

class SeatAllocationUpdateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            sid: (typeof this.props.seat === 'undefined') ? '' : this.props.seat.sid,
            room: (typeof this.props.seat === 'undefined') ? '' : this.props.seat.room,
            name: (typeof this.props.seat === 'undefined') ? '' : this.props.seat.studentName,

            touched: {
                id: false,
                name: false,
                sid: false,
                room: false
            }
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateSeatAllocation(this.state);
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
        if (this.state.touched.sid && sid.length <3 )
            errors.sid = 'Specify the regno';
        if (this.state.touched.room && room.length === 0)
            errors.room = 'Specify the Room';

        return errors;
    }

    render() {
        console.log(this.props.seat);
        const errors = this.validate(this.state.name, this.state.sid, this.state.room);
        return (
            <div>
                <div className="row">
                    <div className="col-12 container-fluid">
                        <h2 className="feature-heading ">Update Seat Allocation</h2>
                        <hr className="feature-line" />
                    </div>
                </div>
                <div>
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
                                    <Input required type="text" name="sid" id="sid" value={this.state.sid} placeholder="Registration No "
                                        onBlur={this.handleBlur('sid')} onChange={this.handleInputChange}
                                        valid={errors.sid === ''} invalid={errors.sid !== ''} />
                                    <FormFeedback>{errors.sid}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="room">Room No</Label>
                                    <Input required type="text" name="room" id="room" value={this.state.room} placeholder="Room No"
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
            </div>
        )
    }
}

export default SeatAllocationUpdateForm;