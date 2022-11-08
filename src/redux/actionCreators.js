import * as ActionTypes from './actionTypes';
import { baseUrl } from '../shared/baseUrl';


export const studentsLoading = () => ({
    type: ActionTypes.STUDENTS_LOADING
});

export const studentsFailed = (errmess) => ({
    type: ActionTypes.STUDENTS_FAILED,
    payload: errmess
});

export const studentsSuccess = (students) => ({
    type: ActionTypes.STUDENTS_SUCCESS,
    payload: students
});

export const updateStudent = (student) => (dispatch) => {

    const newStudent = {
        studentName: student.fullname,
        sid: student.sid,
        mobileNo: student.mobile,
        email: student.email,
        branch: student.program,
        address: student.address,
        fatherName: student.father,
        motherName: student.mother,
        fatherMobile: student.fnum,
        accountNo: student.account,
        ifscCode: student.ifsc,
        reference: student.reference,

    }
    console.log('Student: ', newStudent);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/' + student.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearer
        },
        body: JSON.stringify(newStudent),
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => { alert("Student Updated!"); dispatch(fetchStudents()); })
        .catch(error => {
            console.log('Update students ', error.message);
            alert('Your student could not be updated\nError: ' + error.message);
        })
}

export const fetchStudents = () => (dispatch) => {
    dispatch(studentsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students', {
        headers: {
            'method': 'GET',
            'authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(students => dispatch(studentsSuccess(students)))
        .catch(error => dispatch(studentsFailed(error.message)));
}

export const deleteStudent = (studentId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'students/' + studentId, {
        method: "DELETE",
        headers: {
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(students => { console.log('Student Deleted', students); dispatch(fetchStudents()); dispatch(fetchArchitecture()); dispatch(fetchSeatallocation());})
        .catch(error => dispatch(studentsFailed(error.message)));
};

export const employeesLoading = () => ({
    type: ActionTypes.EMPLOYEES_LOADING
});

export const employeesFailed = (errmess) => ({
    type: ActionTypes.EMPLOYEES_FAILED,
    payload: errmess
});

export const employeesSuccess = (employees) => ({
    type: ActionTypes.EMPLOYEES_SUCCESS,
    payload: employees
});

export const addEmployee = (employee) => ({
    type: ActionTypes.ADD_EMPLOYEE,
    payload: employee
});

export const updateEmployee = (employee) => (dispatch) => {
    console.log(employee.id);
    console.log(employee)
    const newemployee = {
        employeeName: employee.name,
        eid: employee.eid,
        email: employee.email,
        mobileNo: employee.mobile,
        gender: employee.gender,
        salary: employee.salary,
        designation: employee.designation,
        joiningDate: employee.joinDate,
        address: employee.address,
    }
    console.log('Employee: ', newemployee);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'employees/' + employee.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearer
        },
        body: JSON.stringify(newemployee),
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => { alert("Employee Updated!"); dispatch(fetchEmployees()); })
        .catch(error => {
            console.log('Update students ', error.message);
            alert('Your employee could not be updated\nError: ' + error.message);
        })
}
export const postEmployee = (employee) => (dispatch) => {

    const newEmployee = {
        employeeName: employee.name,
        salary: employee.salary,
        email: employee.email,
        mobileNo: employee.mobile,
        gender: employee.gender,
        designation: employee.designation,
        address: employee.address,
        joiningDate: employee.joinDate,
        eid: employee.eid
    }
    console.log('Employee: ', JSON.stringify(newEmployee));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'employees', {
        method: 'POST',
        body: JSON.stringify(newEmployee),
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => { alert("Employee has been added Successfully!!"); dispatch(addEmployee(response)); dispatch(fetchEmployees()); })
        .catch(error => {
            console.log('Post employees ', error.message);
            alert('Your employee could not be added\nError: ' + error.message);
        })
}

export const fetchEmployees = () => (dispatch) => {
    dispatch(employeesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'employees', {
        headers: {
            'method': 'GET',
            'authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(employees => dispatch(employeesSuccess(employees)))
        .catch(error => dispatch(employeesFailed(error.message)));
}

export const deleteEmployee = (employeeId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'employees/' + employeeId, {
        method: "DELETE",
        headers: {
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(employees => { console.log('Employee Deleted', employees); dispatch(fetchEmployees()); })
        .catch(error => dispatch(employeesFailed(error.message)));
};

export const noticesLoading = () => ({
    type: ActionTypes.NOTICES_LOADING
});

export const noticesFailed = (errmess) => ({
    type: ActionTypes.NOTICES_FAILED,
    payload: errmess
});

export const noticesSuccess = (notices) => ({
    type: ActionTypes.NOTICES_SUCCESS,
    payload: notices
});

export const addNotice = (notice) => ({
    type: ActionTypes.ADD_NOTICE,
    payload: notice
});

export const postNotice = (notice) => (dispatch) => {

    const newNotice = {
        title: notice.title,
        description: notice.description
    }
    console.log('Notice: ', newNotice);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'notices', {
        method: 'POST',
        body: JSON.stringify(newNotice),
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => { alert("Notice added Successfully!!"); dispatch(addNotice(response)); dispatch(fetchNotices()); })
        .catch(error => {
            console.log('Post notices ', error.message);
            alert('Your notice could not be added\nError: ' + error.message);
        })
}

export const fetchNotices = () => (dispatch) => {
    dispatch(noticesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'notices', {
        headers: {
            'method': 'GET',
            'authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(notices => dispatch(noticesSuccess(notices)))
        .catch(error => dispatch(noticesFailed(error.message)));
}

export const deleteNotice = (noticeId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'notices/' + noticeId, {
        method: "DELETE",
        headers: {
            'authorization': bearer
        }
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(notices => { console.log('Notice Deleted', notices); dispatch(fetchNotices()); })
        .catch(error => dispatch(noticesFailed(error.message)));
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        admin: response.admin
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                localStorage.setItem('admin', response.admin);
                // Dispatch the success action
                dispatch(fetchStudents());
                dispatch(fetchEmployees());
                dispatch(fetchNotices());
                dispatch(fetchArchitecture());
                dispatch(fetchComplaints());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('admin');
    dispatch(studentsFailed("Error 401: Unauthorized"));
    dispatch(noticesFailed("Error 401: Unauthorized"));
    dispatch(employeesFailed("Error 401: Unauthorized"));
    dispatch(architectureFailed("Error 401: Unauthorized"));
    dispatch(complaintsFailed("Error 401: Unauthorized"))
    dispatch(receiveLogout())
}



export const architectureLoading = () => ({
    type: ActionTypes.ARCHITECTURE_LOADING
});

export const architectureFailed = (errmess) => ({
    type: ActionTypes.ARCHITECTURE_FAILED,
    payload: errmess
});

export const architectureSuccess = (architectures) => ({
    type: ActionTypes.ARCHITECTURE_SUCCESS,
    payload: architectures
});

export const addArchitecture = (architectures) => ({
    type: ActionTypes.ADD_ARCHITECTURE,
    payload: architectures
});

export const fetchArchitecture = () => (dispatch) => {
    dispatch(architectureLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'rooms', {
        headers: {
            'method': 'GET',
            'authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(architectures => dispatch(architectureSuccess(architectures)))
        .catch(error => dispatch(architectureFailed(error.message)));
}


export const seatallocationLoading = () => ({
    type: ActionTypes.SEATALLOCATION_LOADING
});

export const seatallocationFailed = (errmess) => ({
    type: ActionTypes.SEATALLOCATION_FAILED,
    payload: errmess
});

export const seatallocationSuccess = (seatallocation) => ({
    type: ActionTypes.SEATALLOCATION_SUCCESS,
    payload: seatallocation
});

export const addseatallocation = (seatallocation) => ({
    type: ActionTypes.ADD_SEATALLOCATION,
    payload: seatallocation
});

export const postSeatallocation = (seats) => (dispatch) => {

    const newSeatAllocation = {
        studentName: seats.name,
        sid: seats.sid,
        room: seats.room
    }
    console.log('SeatAllocation: ', newSeatAllocation);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'seats', {
        method: 'POST',
        body: JSON.stringify(newSeatAllocation),
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => { alert("Seat has been alloted Successfully!!"); dispatch(addseatallocation(response)); dispatch(fetchStudents()); dispatch(fetchArchitecture()); })
        .catch(error => {
            console.log('Post seats ', error.message);
            alert('Your SealAllocation could not be added\nError: ' + error.message);
        })
}

export const updateSeatAllocation = (seat) => (dispatch) => {
    const newSeat = {
        studentName: seat.name,
        sid: seat.sid,
        room: seat.room
    }
    console.log('Seat: ', newSeat);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'seats/' + seat.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearer
        },
        body: JSON.stringify(newSeat),
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => { dispatch(fetchSeatallocation()); dispatch(fetchStudents()); dispatch(fetchArchitecture()); alert("Seat allocation details updated!"); })
        .catch(error => {
            console.log('Update Seat ', error.message);
            alert('Seat could not be updated\nError: ' + error.message);
        })
}

export const deleteSeatAllocation = (seatId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'seats/' + seatId, {
        method: "DELETE",
        headers: {
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(seat => { console.log('Seat Deleted', seat); dispatch(fetchSeatallocation()); dispatch(fetchStudents()); dispatch(fetchArchitecture()); })
        .catch(error => dispatch(seatallocationFailed(error.message)));
}

export const fetchSeatallocation = () => (dispatch) => {
    dispatch(seatallocationLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'seats', {
        headers: {
            'method': 'GET',
            'authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(seats => dispatch(seatallocationSuccess(seats)))
        .catch(error => dispatch(seatallocationFailed(error.message)));
}

export const complaintsLoading = () => ({
    type: ActionTypes.COMPLAINTS_LOADING
});

export const complaintsFailed = (errmess) => ({
    type: ActionTypes.COMPLAINTS_FAILED,
    payload: errmess
});

export const complaintsSuccess = (students) => ({
    type: ActionTypes.COMPLAINTS_SUCCESS,
    payload: students
});

export const addComplaint = (student) => ({
    type: ActionTypes.ADD_COMPLAINT,
    payload: student
});

export const postComplaint = (complaint) => (dispatch) => {

    const newComplaint = {
        title: complaint.title,
        description: complaint.description,
        eid: complaint.eid
    }
    console.log('Complaint: ', newComplaint);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'complaints', {
        method: 'POST',
        body: JSON.stringify(newComplaint),
        headers: {
            'Content-Type': 'application/json',
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => { alert("Complaint registered Successfully!!"); dispatch(addComplaint(response)); dispatch(fetchComplaints()); })
        .catch(error => {
            console.log('Post complaints ', error.message);
            alert('Your complaint could not be added\nError: ' + error.message);
        })
}

export const fetchComplaints = () => (dispatch) => {
    dispatch(complaintsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'complaints', {
        headers: {
            'method': 'GET',
            'authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(complaints => dispatch(complaintsSuccess(complaints)))
        .catch(error => dispatch(complaintsFailed(error.message)));
}

export const deleteComplaint = (complaintId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'complaints/' + complaintId, {
        method: "DELETE",
        headers: {
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(complaints => { console.log('Complaint Deleted', complaints); dispatch(fetchComplaints()); })
        .catch(error => dispatch(complaintsFailed(error.message)));
};

export const updateComplaint = (complaintId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'complaints/' + complaintId, {
        method: "PUT",
        headers: {
            'authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(complaints => { console.log('Complaint Resolved', complaints); dispatch(fetchComplaints()); })
        .catch(error => dispatch(complaintsFailed(error.message)));
};