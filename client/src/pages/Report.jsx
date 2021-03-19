import axios from "axios";
import { useState, useEffect } from "react";
import pageAuth from "../handler/pageAuth";
export default function Report() {
  const [state, setState] = useState({
    report: [],
    userId: JSON.parse(sessionStorage.getItem("id")),
  });

  useEffect(() => {
    pageAuth("User");
    axios
      .get(`https://id-report-id.herokuapp.com/user/${state.userId}/complaint`)
      .then(({ data }) => setState((state) => ({ ...state, report: data })))
      .catch((err) => {
        throw err;
      });
  }, [state.userId]);

  const handleStatus = ({ status }) => {
    switch (status) {
      case "In Progress":
        return "bg-primary";
      case "Approved":
        return "bg-success";
      case "Rejected":
        return "bg-danger";
      default:
        return "bg-warning";
    }
  };
  const handleReportDeletion = (reportId) => {
    const url = `https://id-report-id.herokuapp.com/complaint/${reportId}`;
    axios.delete(url);
    window.location.reload();
  };

  return (
    <div className="container-fluid pt-4 ">
      <div className="row">
        <div className="col-md-2 border-end min-vh-100">
          <h5 className="text-center border-bottom pb-3">Reports</h5>
          <div className="row">
            <button className="btn btn-transparent d-flex justify-content-between">
              <p className="d-inline-block">Your Reports</p>
              <span className="d-inline-block ms-auto">{">"}</span>
            </button>
          </div>
        </div>

        <div className="col-md-10">
          {state.report.length < 1 && <h4>No report available</h4>}
          {state.report &&
            state.report.map((data, id) => {
              data.complaint_date = new Date(
                data.complaint_date
              ).toDateString();
              return (
                <div className="card mb-3" key={id}>
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <p className="d-inline mb-0">
                      {" "}
                      {data.title}
                      <span className={`badge ${handleStatus(data)} ms-2`}>
                        {data.status}
                      </span>
                      <code className="ms-3">
                        Posted on {data.complaint_date}
                      </code>
                    </p>
                    <button
                      type="button"
                      className="ms-auto btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#rpt-modal-${data._id}`}
                    >
                      Detail
                    </button>
                    {data.status === "Pending" ||
                      (data.status === "Rejected" && (
                        <button
                          type="submit"
                          className="btn text-danger"
                          onClick={() => handleReportDeletion(data._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      ))}
                    <div
                      className="modal fade"
                      id={`rpt-modal-${data._id}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content bg-transparent border-0">
                          <div className="modal-body">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="complaint col-md-6 bg-light shadow rounded p-0 vh-100">
                                  {data.attachment !== "null" && (
                                    <img
                                      src={`https://id-report-id.herokuapp.com/image/${data.attachment}`}
                                      alt={data.title}
                                      className="img-fluid"
                                    />
                                  )}
                                  <div className="container-fluid p-3 d-flex">
                                    <div className="row">
                                      <h4>{data.title}</h4>
                                      <p>{data.description}</p>
                                      <p>City: {data.city}</p>
                                      <p>Instance: {data.destInstance}</p>
                                      <div className="col-md-12 d-flex justify-content-between align-items-center">
                                        <p className="d-inline">
                                          Posted on {data.complaint_date}
                                        </p>
                                        <span
                                          className={`ms-auto badge ${handleStatus(
                                            data
                                          )} `}
                                        >
                                          {data.status}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="complaint col-md-5 vh-100 ms-auto rounded bg-light p-3">
                                  <div className="complaint__box h-75">
                                    <div className="complaint__bar d-flex flex-row p-2">
                                      <div className="col-md-8">
                                        <p>
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipisicing elit. Rem
                                          repudiandae animi doloremque, quam
                                          deleniti hic, veritatis molestias ipsa
                                          totam, consectetur obcaecati! Corrupti
                                          perferendis nisi distinctio dolorem
                                          quam eius laboriosam doloribus.
                                        </p>
                                      </div>
                                      <div className="col-md-4 text-end">
                                        <p>From Admin</p>
                                      </div>
                                    </div>
                                    <div className="complaint__bar d-flex flex-row p-2">
                                      <div className="col-md-8">
                                        <p>
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipisicing elit. Rem
                                          repudiandae animi doloremque, quam
                                          deleniti hic, veritatis molestias ipsa
                                          totam, consectetur obcaecati! Corrupti
                                          perferendis nisi distinctio dolorem
                                          quam eius laboriosam doloribus.
                                        </p>
                                      </div>
                                      <div className="col-md-4 text-end">
                                        <p>From Admin</p>
                                      </div>
                                    </div>
                                    <div className="complaint__bar d-flex flex-row p-2">
                                      <div className="col-md-8">
                                        <p>
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipisicing elit. Rem
                                          repudiandae animi doloremque, quam
                                          deleniti hic, veritatis molestias ipsa
                                          totam, consectetur obcaecati! Corrupti
                                          perferendis nisi distinctio dolorem
                                          quam eius laboriosam doloribus.
                                        </p>
                                      </div>
                                      <div className="col-md-4 text-end">
                                        <p>From Admin</p>
                                      </div>
                                    </div>
                                    <div className="complaint__bar d-flex flex-row p-2">
                                      <div className="col-md-8">
                                        <p>
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipisicing elit. Rem
                                          repudiandae animi doloremque, quam
                                          deleniti hic, veritatis molestias ipsa
                                          totam, consectetur obcaecati! Corrupti
                                          perferendis nisi distinctio dolorem
                                          quam eius laboriosam doloribus.
                                        </p>
                                      </div>
                                      <div className="col-md-4 text-end">
                                        <p>From Admin</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="complaint__input border-top h-25 d-flex flex-column p-4">
                                    <p>Add Response</p>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="response"
                                    />
                                    <div className="col-md-12 text-end pt-3">
                                      <button
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
