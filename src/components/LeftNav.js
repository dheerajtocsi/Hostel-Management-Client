import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavbarToggler, Collapse, UncontrolledCollapse } from 'reactstrap';
import { Link } from 'react-router-dom';

function Carrot({ open }) {
  if (open === true) {
    return (
      <i className="fa fa-caret-up float-right" aria-hidden="true"></i>
    )
  }
  else {
    return (
      <i className="fa fa-caret-down float-right"></i>

    );
  }
}

export default class LeftNav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isNavOpen: false,
      dropdownOpen: false,
      ismealmanageopen: false,
      isstudentmanageopen: false,
      isemployeemanageopen: false,
      iscomplainopen: false,
      issettingsopen: false,
      issetupopen: false,
      isstudentmanagepaymentopen: false,
      isemployeemanagepaymentopen: false
    }
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleManageMeal = this.toggleManageMeal.bind(this);

    this.toggleStudentManage = this.toggleStudentManage.bind(this);
    this.toggleEmployeeManage = this.toggleEmployeeManage.bind(this);
    this.toggleComplaint = this.toggleComplaint.bind(this)

    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleStudentManagePayment = this.toggleStudentManagePayment.bind(this);
    this.toggleEmployeeManagePayment = this.toggleEmployeeManagePayment.bind(this);
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleManageMeal() {
    this.setState({ ismealmanageopen: !this.state.ismealmanageopen });
  }

  toggleStudentManage() {
    this.setState({ isstudentmanageopen: !this.state.isstudentmanageopen });
  }

  toggleEmployeeManage() {
    this.setState({ isemployeemanageopen: !this.state.isemployeemanageopen });
  }

  toggleComplaint() {
    this.setState({ iscomplainopen : !this.state.iscomplainopen});
  }

  toggleSettings() {
    this.setState({ issettingsopen: !this.state.issettingsopen });
  }

  toggleStudentManagePayment() {
    this.setState({ isstudentmanagepaymentopen: !this.state.isstudentmanagepaymentopen });
  }
  
  toggleEmployeeManagePayment() {
    this.setState({ isemployeemanagepaymentopen: !this.state.isemployeemanagepaymentopen });
  }

  render() {
    return (
      <div className="leftNav">
        <Navbar light expand="md" className="me" >
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar >
            <Nav navbar className="flex-column">
              <NavItem>
                <Link className="nav-link" to="/admin/dashboard">
                  <i className="fa fa-tachometer-alt" aria-hidden="true"></i>Dashboard
                      </Link>
              </NavItem>

              <NavItem>
                <Link className="nav-link" id="toggler1" onClick={this.toggleStudentManage} to="/admin/StudentsManage"> <i className="fa fa-child" aria-hidden="true"></i> Students Manage <Carrot open={this.state.isstudentmanageopen} /></Link>
              </NavItem>
              <div>
                <UncontrolledCollapse toggler="#toggler1">

                  <NavItem>
                    <Link className="nav-link offset-2" to="/admin/StudentManage/view"><i className="fa fa-eye" aria-hidden="true"></i> View</Link>
                  </NavItem>
                  
                  <NavItem>
                    <Link className="nav-link offset-2" to="/admin/StudentManage/seatallocation"><i className="fa fa-building" aria-hidden="true"></i>Seat Allocation</Link>
                  </NavItem>
                </UncontrolledCollapse>
              </div>
              <NavItem>
                <Link className="nav-link" id="toggler2" onClick={this.toggleEmployeeManage} to="/admin/EmployeeManage"> <i className="fa fa-users" aria-hidden="true"></i> Employee Manage<Carrot open={this.state.isemployeemanageopen} /></Link>
              </NavItem>

              <div>
                <UncontrolledCollapse toggler="#toggler2">
                  <NavItem>
                    <Link className="nav-link offset-2" to="/admin/EmployeeManage/addnew"><i className="fa fa-plus" aria-hidden="true"></i> Add New</Link>
                  </NavItem>

                  <NavItem>
                    <Link className="nav-link offset-2" to="/admin/EmployeeManage/view"><i className="fa fa-eye" aria-hidden="true"></i> View</Link>
                  </NavItem>
                  
                </UncontrolledCollapse>
              </div>
              <NavItem>
                <Link className="nav-link" to="/admin/NoticeBoard"> <i className="fa fa-newspaper-o" aria-hidden="true"></i> Notice Board</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" id="toggler3" onClick={this.toggleComplaint} to="/admin/Complaints"> <i className="fa fa-newspaper-o" aria-hidden="true"></i> Complaints <Carrot open={this.state.iscomplainopen} /></Link>
              </NavItem>
              <div>
                <UncontrolledCollapse toggler="#toggler3">
                  <NavItem>
                    <Link className="nav-link offset-2" to="/admin/Complaints/unresolved"><i className="fa fa-eye" aria-hidden="true"></i>Unresolved</Link>
                  </NavItem>
                  
                  <NavItem>
                    <Link className="nav-link offset-2" to="/admin/Complaints/resolved"><i className="fa fa-eye" aria-hidden="true"></i>Resolved</Link>
                  </NavItem>
                </UncontrolledCollapse>
              </div>
              {/* <NavItem></NavItem> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>

    )
  }
}