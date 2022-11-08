import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Loading } from './LoadingComponent';

export default function UnresolvedComplaints({ complaints, isLoading, errMess }) {

  const [datatable] = React.useState({
    columns: [
      {
        label: 'Student Id',
        field: 'sid',
        width: 130,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Complaint Date',
        field: 'date',
        width: 180,
        sort : 'asc',
      },
      {
        label: 'Room No.',
        field: 'room',
        width: 130,
      },
      {
        label: 'Employee Id',
        field: 'eid',
        width: 130,
      },
      {
        label: 'Title',
        field: 'title',
        width: 100,
      },
      {
        label: 'Complaint',
        field: 'description',
        width: 250,
      },
      {
        label: 'Actions',
        field: 'actions',
        default: <div>
          <i className="fa fa-check-circle resolve mr-2" onClick={() => this.toggleResolve}></i>
          <i className="fa fa-trash-alt delete"></i>
        </div>,
        width: 100,
      },

    ],
    rows: complaints.filter(complaint => complaint.resolved === false)
  });
  if (isLoading) {
    return (<Loading />);
  }
  else if (errMess) {
    return (<div><p>{errMess} Please try again</p></div>);
  }
  else {
    return (
      <div>
        <div className="row">
          <div className="col-12 container-fluid">
            <h2 className="feature-heading ">Unresolved Complaints</h2>
            <hr className="feature-line" />
          </div>
        </div>
        <div>
          <MDBDataTableV5
            hover
            responsiveMd
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable}
            pagingTop
            searchTop
            searchBottom={false}
            scrollX
          />
        </div>
      </div>
    );
  }
}