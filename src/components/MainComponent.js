import React, { Component } from 'react';
import Header from './Header.js';
import Bar from './NavComponent';
import Footer from './Footer';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Admin from './AdminMainComponent';
import Contact from './ContactComponent';
import Student from './StudentMainComponent';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import Registration from "./Registration.js";
import {
    postComplaint, postEmployee, postNotice,
    postSeatallocation, fetchArchitecture, fetchComplaints, fetchEmployees,
     fetchNotices,  fetchSeatallocation, fetchStudents, deleteComplaint, updateComplaint, deleteSeatAllocation,
    deleteEmployee, deleteNotice, deleteStudent, logoutUser, loginUser, updateStudent, updateEmployee, updateSeatAllocation,
} from '../redux/actionCreators';


const mapDispatchToProps = (dispatch) => ({
    postComplaint: (complaint) => dispatch(postComplaint(complaint)),
    postEmployee: (employee) => dispatch(postEmployee(employee)),
    postNotice: (notice) => dispatch(postNotice(notice)),
    postSeatallocation: (seat) => dispatch(postSeatallocation(seat)),
    fetchArchitecture: () => dispatch(fetchArchitecture()),
    fetchComplaints: () => dispatch(fetchComplaints()),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchNotices: () => dispatch(fetchNotices()),
    fetchSeatallocation: () => dispatch(fetchSeatallocation()),
    fetchStudents: () => dispatch(fetchStudents()),
    deleteComplaint: (complaintId) => dispatch(deleteComplaint(complaintId)),
    updateComplaint: (complaintId) => dispatch(updateComplaint(complaintId)),
    deleteEmployee: (employeeId) => dispatch(deleteEmployee(employeeId)),
    deleteNotice: (noticeId) => dispatch(deleteNotice(noticeId)),
    deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
    deleteSeatAllocation: (seatId) => dispatch(deleteSeatAllocation(seatId)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    updateStudent: (student) => dispatch(updateStudent(student)),
    updateEmployee: (employee) => dispatch(updateEmployee(employee)),
    updateSeatAllocation: (seat) => dispatch(updateSeatAllocation(seat)),

})

const mapStateToProps = (state) => {
    return {
        students: state.students,
        notices: state.notices,
        employees: state.employees,
        architectures: state.architectures,
        seatAllocation: state.seatAllocation,
        complaints: state.complaints,
        auth: state.auth,
    }
}

class Main extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.fetchEmployees();
            this.props.fetchStudents();
            this.props.fetchArchitecture();
            this.props.fetchComplaints();
            this.props.fetchNotices();
            this.props.fetchSeatallocation();
            this.props.loginUser(JSON.parse(localStorage.getItem('creds')));
        }
    }

    render() {
        const AdminRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated && this.props.auth.admin
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        const StudentRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated && !this.props.auth.admin
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );


        return (
            <div>
                <div className="container-fluid topSection">
                    <Header />
                    <Bar auth={this.props.auth} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser} />
                </div>

                <div className="mainSection">
                    <Switch>
                        <Route path="/home" component={() => <Home />} />
                        <Route path="/login" component={() => <LoginForm auth={this.props.auth} loginUser={this.props.loginUser} />} />
                        <AdminRoute path="/admin" component={() => <Admin auth={this.props.auth} postNotice={this.props.postNotice} updateStudent={this.props.updateStudent} updateEmployee={this.props.updateEmployee}
                            employees={this.props.employees} notices={this.props.notices} students={this.props.students} postStudent={this.props.postStudent}  deleteNotice={this.props.deleteNotice} deleteComplaint={this.props.deleteComplaint} updateComplaint={this.props.updateComplaint}
                            deleteStudent={this.props.deleteStudent} deleteSeatAllocation={this.props.deleteSeatAllocation} fetchStudents={this.props.fetchStudents}  complaints={this.props.complaints} postEmployee={this.props.postEmployee} deleteEmployee={this.props.deleteEmployee}
                            fetchEmployees={this.props.fetchEmployees} seatAllocation={this.props.seatAllocation} architectures={this.props.architectures} 
                            updateSeatAllocation={this.props.updateSeatAllocation} postSeatallocation={this.props.postSeatallocation} />} />
                        <Route path="/contactus" component={Contact} />
                        <Route path="/registration" component={Registration} />

                        <StudentRoute path="/student" component={() => <Student auth={this.props.auth} postComplaint={this.props.postComplaint} complaints={this.props.complaints}
                            employees={this.props.employees} notices={this.props.notices} students={this.props.students} 
                            seatAllocation={this.props.seatAllocation} architectures={this.props.architectures} />} />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));