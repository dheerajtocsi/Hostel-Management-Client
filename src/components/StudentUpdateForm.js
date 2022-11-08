import React, { Component } from 'react'
import { Form, Input, Button, Label, Col, Row, FormGroup, FormFeedback } from 'reactstrap';

class StudentUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            sid: (typeof this.props.student === 'undefined') ? '' : this.props.student.sid,
            fullname: (typeof this.props.student === 'undefined') ? '' : this.props.student.studentName,
            mobile: (typeof this.props.student === 'undefined') ? '' : this.props.student.mobileNo,
            program: (typeof this.props.student === 'undefined') ? '' : this.props.student.branch,
            father: (typeof this.props.student === 'undefined') ? '' : this.props.student.fatherName,
            mother: (typeof this.props.student === 'undefined') ? '' : this.props.student.motherName,
            fnum: (typeof this.props.student === 'undefined') ? '' : this.props.student.fatherMobile,
            address: (typeof this.props.student === 'undefined') ? '' : this.props.student.address,
            email: (typeof this.props.student === 'undefined') ? '' : this.props.student.email,
            account: (typeof this.props.student === 'undefined') ? '' : this.props.student.accountNo,
            ifsc: (typeof this.props.student === 'undefined') ? '' : this.props.student.ifscCode,
            reference: (typeof this.props.student === 'undefined') ? '' : this.props.student.reference,
            touched: {
                sid: false,
                fullname: false,
                mobile: false,
                program: false,
                father: false,
                mother: false,
                fnum: false,
                address: false,
                email: false,
                account: false,
                ifsc: false,
                reference: false,
            }
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateStudent(
            this.state
        );
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate = (
        sid,
        fullname,
        mobile,
        program,
        mother,
        father,
        fnum,
        email,
        address,
        account,
        ifsc,
        reference
    ) => {
        const errors = {
            sid: '',
            fullname: '',
            mobile: '',
            program: '',
            mother: '',
            father: '',
            fnum: '',
            email: '',
            address: '',
            account: '',
            ifsc: '',
            reference: ''
        }

        if (this.state.touched.sid && sid.length !== 8)
            errors.sid = 'Sid should be of 8 characters';
        if (this.state.touched.fullname && fullname.length < 3)
            errors.fullname = 'Name should be greater than 3 characters';
        if (this.state.touched.program && program.length < 3)
            errors.program = 'Program should be of minimum length of 3 characters';
        if (this.state.touched.mother && (mother.length > 30 || mother.length < 3))
            errors.mother = 'Name should not be greater than 30 characters and smaller than 3 characters';
        if (this.state.touched.father && (father.length > 30 || father.length < 3))
            errors.father = 'Name should not be greater than 30 characters and smaller than 3 characters';
        if (this.state.touched.address && (address.length < 5 || address.length > 50))
            errors.address = 'Address length should lie between 5 and 50 characters'
        if (this.state.touched.mobile && mobile.length !== 10)
            errors.mobile = 'Enter a valid Mobile Number';
        if (this.state.touched.fnum && mobile.length !== 10)
            errors.fnum = 'Enter a valid Mobile Number';
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Enter a valid email';

        if (this.state.touched.account && account.length < 9 && account.length > 20)
            errors.account = 'Account No. should be of length 9 to 20'

        if (this.state.touched.ifsc && ifsc.length !== 11)
            errors.ifsc = 'Ifsc Code should be of length 11'

        if (this.state.touched.reference && reference.length < 20 && reference.length > 30)
            errors.reference = 'Reference No. should be of length 20 to 30'


        return errors;
    }

    render() {
        const errors = this.validate(
            this.state.sid,
            this.state.fullname,
            this.state.mobile,
            this.state.program,
            this.state.mother,
            this.state.father,
            this.state.fnum,
            this.state.email,
            this.state.address,
            this.state.account,
            this.state.ifsc,
            this.state.reference);
        return (
            <div>
                <div className="row">
                    <div className="col-12 container-fluid">
                        <h2 className="feature-heading ">Update Student Details</h2>
                        <hr className="feature-line" />
                    </div>
                </div>
                <Form className="myForm" onSubmit={this.handleSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="sid">Registration No.</Label>
                                <Input required type="text" id="sid" name="sid"
                                    value={this.state.sid}
                                    onChange={this.handleInputChange} valid={errors.sid === ''} invalid={errors.sid !== ''} onBlur={this.handleBlur('sid')} />
                                <FormFeedback>{errors.sid}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>

                                <Label htmlFor="fullname">Fullname</Label>
                                <Input type="text" id="fullname" name="fullname"
                                    value={this.state.fullname}
                                    onChange={this.handleInputChange} valid={errors.fullname === ''} invalid={errors.fullname !== ''} onBlur={this.handleBlur('fullname')} />
                                <FormFeedback>{errors.fullname}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="mobile">Mobile No.</Label>
                                <Input type="number" id="mobile" name="mobile"
                                    value={this.state.mobile}
                                    onChange={this.handleInputChange} valid={errors.mobile === ''} invalid={errors.mobile !== ''} onBlur={this.handleBlur('mobile')} />
                                <FormFeedback>{errors.mobile}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="program">Program</Label>
                                <Input type="text" id="program" name="program"
                                    value={this.state.program}
                                    onChange={this.handleInputChange} valid={errors.program === ''} invalid={errors.program !== ''} onBlur={this.handleBlur('program')} />
                                <FormFeedback>{errors.program}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="father">Father Name</Label>
                                <Input type="text" id="father" name="father"
                                    value={this.state.father}
                                    onChange={this.handleInputChange} valid={errors.father === ''} invalid={errors.father !== ''} onBlur={this.handleBlur('father')} />
                                <FormFeedback>{errors.father}</FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="fnum">Father Mobile</Label>
                                <Input type="number" id="fnum" name="fnum"
                                    value={this.state.fnum}
                                    onChange={this.handleInputChange} valid={errors.fnum === ''} invalid={errors.fnum !== ''} onBlur={this.handleBlur('fnum')} />
                                <FormFeedback>{errors.fnum}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="mother">Mother Name</Label>
                                <Input type="text" id="mother" name="mother"
                                    value={this.state.mother}
                                    onChange={this.handleInputChange} valid={errors.mother === ''} invalid={errors.mother !== ''} onBlur={this.handleBlur('mother')} />
                                <FormFeedback>{errors.mother}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} valid={errors.email === ''} invalid={errors.email !== ''} onBlur={this.handleBlur('email')} />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="address">P. Address</Label>
                                <Input type="text" id="address" name="address"
                                    value={this.state.address}
                                    onChange={this.handleInputChange} valid={errors.address === ''} invalid={errors.address !== ''} onBlur={this.handleBlur('address')} />
                                <FormFeedback>{errors.address}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="account">Account No.</Label>
                                <Input type="number" id="account" name="account"
                                    value={this.state.account}
                                    onChange={this.handleInputChange} valid={errors.account === ''} invalid={errors.account !== ''} onBlur={this.handleBlur('account')} />
                                <FormFeedback>{errors.account}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="ifsc">Ifsc Code</Label>
                                <Input type="text" id="ifsc" name="ifsc"
                                    value={this.state.ifsc}
                                    onChange={this.handleInputChange} valid={errors.ifsc === ''} invalid={errors.ifsc !== ''} onBlur={this.handleBlur('ifsc')} />
                                <FormFeedback>{errors.ifsc}</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="reference">Reference No.</Label>
                                <Input type="text" id="reference" name="reference"
                                    value={this.state.reference}
                                    onChange={this.handleInputChange} valid={errors.reference === ''} invalid={errors.reference !== ''} onBlur={this.handleBlur('reference')} />
                                <FormFeedback>{errors.reference}</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit" color="primary">
                        Update
                    </Button>
                </Form>
            </div>
        )
    }
}

export default StudentUpdateForm;