import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function StudentResolvedView({ complaints }) {

  const [datatable] = React.useState({
    columns: [
      {
        label: 'Employee Id',
        field: 'eid',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Complaint Date',
        field: 'date',
        width: 150,
      },
      {
        label: 'Resolved Date',
        field: 'resolvedDate',
        width: 150,
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
    ],
    rows: complaints.filter(complaint => complaint.resolved === true)
  });
  return (
    <div>
      <div className="row">
        <div className="col-12 container-fluid">
          <h2 className="feature-heading ">Resolved Complaints</h2>
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
          searching={false}
          scrollX
        />
      </div>
    </div>
  );
}