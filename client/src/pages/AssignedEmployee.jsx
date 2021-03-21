import axios from "axios";
import { useState, useEffect, Fragment } from "react";

export default function AssignedEmployee() {
  const [state, setState] = useState({
    employee_id: JSON.parse(sessionStorage.getItem("id")),
    assignedReport: null,
    response: "",
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

  const handleGetData = () => {
    const employeeDataUrl = `http://localhost:2021/user/${state.employee_id}`;
    axios
      .get(employeeDataUrl)
      .then(({ data: assignedReport }) =>
        setState((state) => ({ ...state, assignedReport }))
      )
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

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleResponseSubmit = (reportId) => {
    // const url = `https://id-report-id.herokuapp.com/response/`;
    const url = `http://localhost:2021/response/`;
    const responseData = {
      complaint_id: reportId,
      response_text: state.response,
      user_id: state.employee_id,
    };
    axios
      .post(url, responseData)
      .then((data) => handleGetData())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetData();
  });
  return (
    <Fragment>
      <div className="container" id="download">
        {state.assignedReport && (
          <div className="row">
            <div className="col-md-3 rounded shadow p-5 text-center">
              {state.assignedReport.attachment && (
                <img
                  src={`https://id-report-id.herokuapp.com/image/${state.assignedReport.attachment}`}
                  alt={state.assignedReport.title}
                  className="img-fluid"
                />
              )}
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
                  <p>City: {state.assignedReport.assigned_report.city}</p>
                  <p>
                    Instance:{" "}
                    {state.assignedReport.assigned_report.destInstance}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>User:</h5>
                  <p>Name : {state.assignedReport.username}</p>
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
        <div className="row">
          <div className="complaint col-md-12 vh-100 mt-5 bg-white shadow rounded d-flex flex-column justify-content-between">
            <div className="d-flex flex-column">
              <h5 className="my-4 ms-2">Response Box</h5>
              <div className="complaint__box h-auto border-top">
                {state.assignedReport
                  ? state.assignedReport.assigned_report.response.map(
                      (data, index) => (
                        <div
                          className="complaint__bar d-flex flex-row p-2"
                          key={index}
                        >
                          <div className="col-md-8">
                            <p>{data.response_text}</p>
                          </div>
                          <div className="col-md-4 text-end">
                            <p>From {data.user_id.username}</p>
                          </div>
                        </div>
                      )
                    )
                  : ""}
              </div>
            </div>
            <div className="complaint__input h-25 border-top h-auto d-flex flex-column w-100 p-4 align-self-end">
              <p>Add Response</p>
              <input
                onChange={handleChange}
                className="form-control"
                type="text"
                name="response"
                value={state.response}
              />
              <div className="col-md-12 text-end pt-3">
                <button
                  onClick={() => {
                    handleResponseSubmit(
                      state.assignedReport.assigned_report._id
                    );
                  }}
                  className="btn btn-sm btn-danger"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
