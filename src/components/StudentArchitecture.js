import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Loading } from './LoadingComponent';

export default function ArchitectureV({ architectures, isLoading, errMess }) {
  const [datatable] = React.useState({
    columns: [
      {
        label: 'Room No',
        field: 'room',
        width: 150,
      },
      {
        label: 'No. of Students',
        field: 'countStudent',
        width: 150,
      }
    ],
    rows: architectures
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
            <h2 className="feature-heading ">Architecture</h2>
            <hr className="feature-line" />
          </div>
        </div>
        <div >
          <MDBDataTableV5
            hover
            responsiveMd
            bordered
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