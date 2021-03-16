import { useEffect, Fragment } from "react";
import Nav from "./Nav";
import pageAuth from "../handler/pageAuth";

export default function Dashboard(props) {
  useEffect(() => pageAuth("Employee"), []);
  return (
    <Fragment>
      <Nav extClass="border-bottom" />
      <div className="container-fluid min-vh-100">
        <div className="row">
          <div className="col-md-2 border-end pt-3 min-vh-100">
            <h5 className="text-center border-bottom pb-3">Reports</h5>
            <div className="row h-100 d-flex flex-column">
              <a
                href="/employee"
                className="p btn btn-transparent d-flex justify-content-between text-dark "
              >
                <p className="d-inline-block">Report List</p>
                <span className="d-inline-block ">
                  <i className="bi bi-chevron-right text-danger"></i>
                </span>
              </a>
              <a
                href="/employee/assigned"
                className="p btn btn-transparent d-flex justify-content-between text-dark "
              >
                <p className="d-inline-block">Assigned Report</p>
                <span className="d-inline-block ">
                  <i className="bi bi-chevron-right text-danger"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="col-md-10 pt-3">{props.children}</div>
        </div>
      </div>
    </Fragment>
  );
}
