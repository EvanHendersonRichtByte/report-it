import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import pageAuth from "../handler/pageAuth";
import $ from "jquery";
import NoImg from "../assets/img/ImgUnavailable.jpg";
import LoadingScreen from "../layouts/LoadingScreen";
export default function Report() {
  const [state, setState] = useState({
    report: [],
    kota: [],
    response: "",
    user_id: JSON.parse(sessionStorage.getItem("id")),
    title: "",
    description: "",
    date: "",
    city: "Kota Malang",
    destInstance: "",
    attachment: null,
  });

  useEffect(() => {
    pageAuth("User");
    handleGetReportData();
  });

  const handleGetReportData = () => {
    const userComplaintUrl = `http://localhost:2021/user/${state.user_id}/complaint`;
    axios
      .get(userComplaintUrl)
      .then(({ data: report }) => setState((state) => ({ ...state, report })))
      .catch((err) => console.log(err));
  };

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

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleReportDeletion = (reportId) => {
    $("#loading").removeClass("d-none");
    const url = `http://localhost:2021/complaint/${reportId}`;
    axios.delete(url);
    window.location.reload();
  };

  const handleResponseSubmit = (reportId) => {
    $("body").bind("wheel", function () {
      return false;
    });

    const url = `http://localhost:2021/response/`;
    const responseData = {
      complaint_id: reportId,
      response_text: state.response,
      user_id: state.user_id,
    };
    axios
      .post(url, responseData)
      .then((data) => handleGetReportData())
      .catch((err) => console.log(err));
  };

  const handleOptionShow = (status, id) => {
    if (status === "Pending") {
      return (
        <Fragment>
          <button
            type="submit"
            className="btn text-danger"
            onClick={() => handleReportDeletion(id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </Fragment>
      );
    }
  };

  const handleImage = (attachment, title) => {
    switch (attachment) {
      case "undefined":
        return <img src={NoImg} alt={title} className="img-fluid" />;
      case "null":
        return <img src={NoImg} alt={title} className="img-fluid" />;
      default:
        return (
          <img
            src={`http://localhost:2021/image/${attachment}`}
            alt={title}
            className="img-fluid"
          />
        );
    }
  };

  return (
    <div className="container-fluid pt-4 ">
      <LoadingScreen />
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
          {state.report && <h4>No report available</h4>}
          {state.report &&
            state.report.map((data, id) => {
              data.complaint_date = new Date(
                data.complaint_date
              ).toDateString();
              return (
                <div className="card mb-3" key={id}>
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <p className="d-inline mb-0">
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
                    {handleOptionShow(data.status, data._id)}
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
                                  {handleImage(data.attachment, data.title)}
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
                                    {data.response &&
                                      data.response.map((e, i) => (
                                        <div
                                          key={i}
                                          className="complaint__bar d-flex flex-row p-2"
                                        >
                                          <div className="col-md-8">
                                            <p>{e.response_text}</p>
                                          </div>
                                          <div className="col-md-4 text-end">
                                            <p>From {e.user_id.username}</p>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                  <div className="complaint__input border-top h-25 d-flex flex-column p-4">
                                    <p>Add Response</p>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="response"
                                      onChange={handleChange}
                                      placeholder="You cannot add response "
                                      disabled
                                    />
                                    <div className="col-md-12 text-end pt-3">
                                      <button
                                        onClick={() =>
                                          handleResponseSubmit(data._id)
                                        }
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
