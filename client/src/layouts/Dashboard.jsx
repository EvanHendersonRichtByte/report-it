import { Fragment, useState } from "react";
import Nav from "./Nav";

export default function Dashboard(props) {
  const [state] = useState({
    level: JSON.parse(sessionStorage.getItem("level")),
    assignedReport: sessionStorage.getItem("assigned_report"),
  });

  const handleAssignedNav = () => {
    if (state.assignedReport) {
      if (state.assignedReport !== "null") {
        return (
          <a
            href="/employee/assigned"
            className="p btn btn-transparent d-flex justify-content-between text-dark "
          >
            <p className="d-inline-block">
              <i className="bi bi-eye me-1"></i>
              Assigned Report
            </p>
            <span className="d-inline-block ">
              <i className="bi bi-chevron-right text-danger"></i>
            </span>
          </a>
        );
      }
    } else {
      return "";
    }
  };

  const handleLevelNav = () => {
    switch (state.level) {
      case "Employee":
        return (
          <Fragment>
            <a
              href="/employee"
              className="p btn btn-transparent d-flex justify-content-between text-dark "
            >
              <p className="d-inline-block">
                <i className="bi bi-journal-text me-1"></i>
                Report List
              </p>
              <span className="d-inline-block ">
                <i className="bi bi-chevron-right text-danger"></i>
              </span>
            </a>
            <a
              href="/employee/history"
              className="p btn btn-transparent d-flex justify-content-between text-dark "
            >
              <p className="d-inline-block">
                <i className="bi bi-journal-check me-1"></i>
                Report History
              </p>
              <span className="d-inline-block ">
                <i className="bi bi-chevron-right text-danger"></i>
              </span>
            </a>
            {handleAssignedNav()}
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <a
              href="/report"
              className="p btn btn-transparent d-flex justify-content-between text-dark "
            >
              <p className="d-inline-block">
                <i className="bi bi-journal-text me-1"></i>
                Your Report
              </p>
              <span className="d-inline-block ">
                <i className="bi bi-chevron-right text-danger"></i>
              </span>
            </a>
            <a
              href="/report/history"
              className="p btn btn-transparent d-flex justify-content-between text-dark "
            >
              <p className="d-inline-block">
                <i className="bi bi-journal-check me-1"></i>
                Report History
              </p>
              <span className="d-inline-block ">
                <i className="bi bi-chevron-right text-danger"></i>
              </span>
            </a>
          </Fragment>
        );
    }
  };
  return (
    <Fragment>
      <Nav extClass="border-bottom" />
      <div className="container-fluid min-vh-100">
        <div className="row">
          <div className="col-md-2 border-end pt-3 min-vh-100">
            <h5 className="text-center border-bottom pb-3">Reports</h5>
            <div className="row h-100 d-flex flex-column">
              {handleLevelNav()}
            </div>
          </div>
          <div className="col-md-10 pt-3">{props.children}</div>
        </div>
      </div>
    </Fragment>
  );
}
