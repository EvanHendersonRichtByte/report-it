import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import pageAuth from "../handler/pageAuth";
export default function Employee() {
  const [state, setState] = useState({ report: [] });

  useEffect(() => {
    pageAuth("Employee");
    let arr = [];
    axios
      .get(`https://id-report-id.herokuapp.com/complaint`)
      .then(({ data }) => {
        data.forEach((i) => {
          axios
            .get(`https://id-report-id.herokuapp.com/user/${i.user_id}`)
            .then((f) => {
              const { _id, ...other } = f.data;
              arr = [...arr, { ...i, ...other }];
              setState((state) => ({ ...state, report: arr }));
            });
        });
      })
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

  const handleDownloadDoc = (data) => {
    const confirmVal = window.confirm(
      "By pressing the download document button, you will be assigned to verify this document, are you sure?"
    );
    if (confirmVal) {
      // Update Logic
      const employee_id = JSON.parse(sessionStorage.getItem("id"));
      const updateReportUrl = `https://id-report-id.herokuapp.com/complaint/${data._id}`;
      const updateEmployeeUrl = `https://id-report-id.herokuapp.com/user/${employee_id}`;
      const status = "In Progress";
      const combineData = { ...data, employee_id, status };
      console.log(data._id);
      axios
        .put(updateReportUrl, combineData)
        .then(() => {
          axios
            .put(updateEmployeeUrl, { assigned_report_id: data._id })
            .then(() => {
              // Print Logic
              const printContents = document.getElementById("download")
                .innerHTML;
              const originalContents = document.body.innerHTML;
              document.body.innerHTML = printContents;
              document.getElementById("deleteDis").className += " d-none";
              window.print();
              document.body.innerHTML = originalContents;
              window.location.reload();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
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
                  <div className="modal-dialog modal-xl modal-dialog-scrollable">
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
                      <div className="modal-body" id="download">
                        <div className="container-fluid ps-0">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                src={`https://id-report-id.herokuapp.com/image/${data.attachment}`}
                                alt={data.title}
                                className="img-fluid"
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="row">
                                <div className="col-md-6">
                                  <h5>Description:</h5>
                                  <p>{data.description}</p>
                                  <p>City: {data.city}</p>
                                  <p>Instance: {data.destInstance}</p>
                                </div>
                                <div className="col-md-6">
                                  <h5>User:</h5>
                                  <p>Name : {data.username}</p>
                                  <p>City : {data.city}</p>
                                  <p>Email : {data.email}</p>
                                  <p>Telephone: {data.telephone}</p>
                                </div>
                              </div>
                              <div className="col-md-12 pt-5">
                                <button
                                  onClick={() => handleDownloadDoc(data)}
                                  className="btn btn-block btn-success"
                                  id="deleteDis"
                                >
                                  Download Document
                                </button>
                              </div>
                            </div>
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
