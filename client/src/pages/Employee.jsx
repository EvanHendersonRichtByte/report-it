import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import pageAuth from "../handler/pageAuth";
export default function Employee() {
  const [state, setState] = useState({
    report: [],
  });

  useEffect(() => {
    pageAuth("Employee");
    axios
      .get(`https://id-report-id.herokuapp.com/complaint`)
      .then(({ data }) => setState((state) => ({ ...state, report: data })))
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleStatus = ({ status }) => {
    switch (status) {
      case "In Progress":
        return "bg-primary";
      case "Approved":
        return "bg-success";
      case "Disaproved":
        return "bg-danger";
      default:
        return "bg-warning";
    }
  };
  return (
    <Fragment>
      {state.report.length < 1 && <h4>No report available</h4>}
      {state.report &&
        state.report.map((data, id) => {
          data.complaint_date = new Date(data.complaint_date).toDateString();
          return (
            <div className="card mb-3" key={id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <p className="d-inline mb-0">
                  {" "}
                  {data.title}
                  <span className={`badge ${handleStatus(data)} ms-2`}>
                    {data.status}
                  </span>
                  <code className="ms-3">Posted on {data.complaint_date}</code>
                </p>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#rpt-modal-${data._id}`}
                >
                  Detail
                </button>
                <div
                  className="modal fade"
                  id={`rpt-modal-${data._id}`}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {data.title}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img
                          src={`https://id-report-id.herokuapp.com/uploads/${data.attachment}`}
                          alt={data.title}
                          className="img-fluid"
                        />
                        <div className="container-fluid p-3 d-flex">
                          <div className="row">
                            <h5>Description:</h5>
                            <p>{data.description}</p>
                            <p>City: {data.city}</p>
                            <p>Instance: {data.destInstance}</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <p className="me-auto ms-2">
                          Posted on {data.complaint_date}
                        </p>
                        <span className={`badge ${handleStatus(data)} `}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
}