import React from "react";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

function ChangePassword() {
    const changepassHandler = (event) => {
        event.preventDefault();
        const oldPass = event.target.oldPass.value;
        const newPass = event.target.newPass.value;
        const data = {
          oldPass,
          newPass,
        };
        const bearer = 'Bearer ' + localStorage.getItem('token');

        axios
      .post(baseUrl + "students/password", data, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': bearer
        }
      })
      .then((response) => {
        console.log(response);
        // event.target.reset(null);
        alert("Password Changed successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    };



  return (
    <>
      <div className="container">
        <h3 className="Auth-form-title">Change Password</h3>
        <form className="form-group" onSubmit={changepassHandler}>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Old Password:</label>
              <input
                type="password"
                className="form-control"
                name="oldPass"
                placeholder="old password"
                required
              />
            </div>
            <br/>
            <div className="form-group col-md-6">
              <label>New Password:</label>
              <input
                type="text"
                className="form-control"
                name="newPass"
                placeholder="new password"
                required
              />
            </div>
          </div>
          <br />
          <div className="btnn">
            <button type="submit" className="btn btn-primary">
              Change
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;