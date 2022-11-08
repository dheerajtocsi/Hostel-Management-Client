import React, { Component } from 'react';
import StudentDashBoard from './StudentDashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import ArchitectureV from './StudentArchitecture';
import StudentProfile from './StudentProfile';
import StudentLeftNav from './Studentleftnav';
import NoticeV from './StudentNoticeV';
import SubmitComplaint from './SubmitComplaint';
import EmployeeView from './StudentEmployeeView';
import ChangePassword from './Password';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Students: [],
      Employees: [],
      Notices: [],
      Architectures: [],
      // Seats: [],
      Complaints: []
    }
  }

  componentDidMount() {
    let students = [];
    this.props.students.students.forEach(element => {
      students.push({
        sid: element.sid,
        name: element.studentName,
        mobile: element.mobileNo,
        program: element.branch,
        gMob: element.fatherMobile,
        guardian: element.fatherName,
        pAddress: element.address,

      })
    });
    const studentlist = this.state.Students.concat(students);

    let employees = [];
    this.props.employees.employees.forEach(element => {
      employees.push({
        name: element.employeeName,
        gender: element.gender,
        eid: element.eid,
        designation: element.designation,
        mobile: element.mobileNo,
        date: element.joiningDate.split('T')[0],
        address: element.address
      })
    });
    const employeeList = this.state.Students.concat(employees);

    let notices = [];
    this.props.notices.notices.forEach(element => {
      notices.push({
        title: element.title,
        description: element.description,

      })
    });
    const noticeList = this.state.Notices.concat(notices);

    let complaints = [];
    this.props.complaints.complaints.forEach(element => {
      complaints.push({
        name: element.name,
        sid: element.sid,
        date : element.date.split('.')[0],
        title: element.title,
        description: element.description,
        eid : element.eid,
        resolved: element.resolved,
        resolvedDate: element.resolvedDate.split('.')[0]
      })
    });
    const complaintsList = this.state.Complaints.concat(complaints);

    let architectures = [];
    this.props.architectures.architectures.forEach(element => {
      architectures.push({
        room: element.room,
        countStudent: element.countStudent,
      })
    });
    const architectureList = this.state.Architectures.concat(architectures);

    this.setState({
      Students: studentlist,
      Employees: employeeList,
      Notices: noticeList,
      Architectures : architectureList,
      Complaints: complaintsList
    });
  }

  render() {
    return (
      <div className="feature admin">
        <div className="row">
          <div className="col-md-3">
            <StudentLeftNav />
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path="/student/dashboard" component={() => <StudentDashBoard architectures={this.props.architectures}
                employees={this.props.employees}
                students={this.props.students}
                auth={this.props.auth}
                notices={this.props.notices.notices} />} />
              <Route exact path="/student/profile" component={() => <StudentProfile students={this.props.students} auth={this.props.auth} />} />
              <Route exact path="/student/Noticeboard" component={() => <NoticeV notices={this.state.Notices} isLoading={this.props.notices.isLoading} errMess={this.props.notices.errMess} />} />
              <Route exact path="/student/Architecture" component={() => <ArchitectureV architectures={this.state.Architectures} isLoading={this.props.architectures.isLoading} errMess={this.props.architectures.errMess} />} />
              <Route exact path="/student/Complaints" component={() => <SubmitComplaint  auth={this.props.auth} complaints={this.state.Complaints} isLoading={this.props.complaints.isLoading} errMess={this.props.complaints.errMess} postComplaint={this.props.postComplaint} />} />
              {/* <Route exact path="/student/studentView" component={() => <StudentView students={this.state.Students}  />} /> */}
              <Route exact path="/student/rooms" component={() => <ArchitectureV architectures={this.state.Architectures} isLoading={this.props.architectures.isLoading} errMess={this.props.architectures.errMess} />} />
              <Route exact path="/student/employeeView" component={() => <EmployeeView employees={this.state.Employees} isLoading={this.props.employees.isLoading} errMess={this.props.employees.errMess} />} />
              <Route exact path="/student/ChangePassword" component={ChangePassword} />
              <Redirect to="/student/dashboard" />
            </Switch>

          </div>
        </div>
      </div>
    )
  }
}
export default Student;