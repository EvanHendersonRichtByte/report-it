import axios from "axios";
import { useState, useEffect } from "react";

export default function AssignedEmployee() {
  const [state, setState] = useState({
    employee_id: JSON.parse(sessionStorage.getItem("id")),
    assignedReport: null,
  });
  useEffect(() => {
    const getEmployeeUrl = `https://id-report-id.herokuapp.com/user/${state.employee_id}`;
    const getUserUrl = "https://id-report-id.herokuapp.com/user/";
    const getReportUrl = "https://id-report-id.herokuapp.com/complaint/";
    let assignedReport;
    axios
      .get(getEmployeeUrl)
      .then((employee) => {
        axios
          .get(getReportUrl + employee.data.assigned_report_id)
          .then((report) => {
            axios
              .get(getUserUrl + report.data.user_id)
              .then((user) => {
                assignedReport = { ...report.data, ...user.data };
                setState((state) => ({ ...state, assignedReport }));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [state.employee_id]);
  return (
    <div className="container">
      <div className="row">
        {state.assignedReport && (
          <div className="container-fluid ps-0">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={`https://id-report-id.herokuapp.com/image/${state.assignedReport.attachment}`}
                  alt={state.assignedReport.title}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Description:</h5>
                    <p>{state.assignedReport.description}</p>
                    <p>City: {state.assignedReport.city}</p>
                    <p>Instance: {state.assignedReport.destInstance}</p>
                  </div>
                  <div className="col-md-6">
                    <h5>User:</h5>
                    <p>Name : {state.assignedReport.username}</p>
                    <p>City : {state.assignedReport.city}</p>
                    <p>Email : {state.assignedReport.email}</p>
                    <p>Telephone: {state.assignedReport.telephone}</p>
                  </div>
                </div>
                <div className="col-md-12 pt-5">
                  <button className="btn btn-block btn-success" id="deleteDis">
                    Download Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
