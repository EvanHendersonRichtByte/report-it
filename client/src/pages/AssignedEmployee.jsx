import axios from "axios";
import { useState, useEffect } from "react";

export default function AssignedEmployee() {
  const [state, setState] = useState({
    employee_id: JSON.parse(sessionStorage.getItem("id")),
    assignedReport: null,
  });

  const handleDownloadDoc = (data) => {
    const printContents = document.getElementById("download").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    const elementDeletion = document.getElementsByClassName("deleteDis");
    for (const e of elementDeletion) {
      e.classList += " d-none";
    }
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleStatusDeciding = (status) => {
    const url = `https://id-report-id.herokuapp.com/complaint/${state.assignedReport._id}`;
    axios
      .put(url, { status })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleStatus = ({ status }) => {
    switch (status) {
      case "In Progress":
        return "primary";
      case "Approved":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "warning";
    }
  };

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
                const { _id, ...other } = user.data;
                assignedReport = { ...report.data, ...other };
                setState((state) => ({ ...state, assignedReport }));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [state.employee_id]);
  return (
    <div className="container" id="download">
      {state.assignedReport && (
        <div className="row">
          <div className="col-md-3 rounded shadow p-5 text-center">
            <img
              src={`https://id-report-id.herokuapp.com/image/${state.assignedReport.attachment}`}
              alt={state.assignedReport.title}
              className="img-fluid"
            />
            <button
              onClick={() => handleDownloadDoc(state.assignedReport)}
              className="deleteDis btn btn-secondary mt-3"
            >
              Print Document
            </button>
            <h5 className={`mt-3 text-${handleStatus(state.assignedReport)}`}>
              {state.assignedReport.status}
            </h5>
          </div>
          <div className="col-md-8 ms-auto rounded shadow p-5">
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
            <div className="mt-5 decide col-md-12 d-flex justify-content-center position-relative align-items-center">
              <button
                onClick={() => {
                  handleStatusDeciding("Approved");
                }}
                className="decide__left-button btn-block btn btn-success"
              >
                Allow
              </button>
              <span>OR</span>
              <button
                onClick={() => {
                  handleStatusDeciding("Rejected");
                }}
                className="decide__right-button btn-block btn btn-danger"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}