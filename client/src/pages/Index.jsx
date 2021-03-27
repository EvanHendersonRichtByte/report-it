import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav from "../layouts/Nav";
import counterUp from "counterup2";
import $ from "jquery";
import {
  Form,
  Input,
  InputGroup,
  Option,
  Select,
  Textarea,
} from "../components/Form";
import { Waypoint } from "react-waypoint";
import LoadingScreen from "../layouts/LoadingScreen";

export default function Index() {
  const [state, setState] = useState({
    kota: [],
    user_id: JSON.parse(sessionStorage.getItem("id")),
    level: JSON.parse(sessionStorage.getItem("level")),
    title: "",
    description: "",
    date: "",
    city: "Kota Malang",
    destInstance: "",
    attachment: null,
    fileName: "",
  });

  useEffect(() => {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=35")
      .then((response) =>
        setState((state) => ({ ...state, kota: response.data.kota_kabupaten }))
      )
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (e) => {
    $("#nav-loading").removeClass("d-none");
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", state.user_id);
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("date", state.date);
    formData.append("city", state.city);
    formData.append("destInstance", state.destInstance);
    formData.append("attachment_id", "x");
    formData.append("attachment", state.attachment);
    const url = "http://localhost:2021/complaint";
    axios
      .post(url, formData)
      .then(() => {
        window.location.assign("/report");
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleDeleteFileInput = () =>
    setState((state) => ({ ...state, attachment: null, fileName: "" }));

  const handleChange = (e) =>
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    if ($(".indexFile")[0].files.length > 0) {
      const type = $(".indexFile")[0].files[0].type;
      if (type === "image/jpeg" || type === "image/png") {
        setState((state) => ({
          ...state,
          attachment: e.target.files[0],
          fileName: e.target.files[0].name,
        }));
      } else {
        const alertElement = "#indexAlert";
        $(alertElement).removeClass("d-none");
        setTimeout(() => {
          $(alertElement).fadeTo(2000, 0, () => {
            $(alertElement).addClass("d-none");
            $(alertElement).fadeTo(0, 1);
          });
        }, 2000);
      }
    }
  };

  const handleWaypointEnter = () => {
    const counterElement = document.querySelectorAll(".counter");
    counterElement.forEach((item) => {
      counterUp(item, { duration: 2000 });
    });
  };

  const handleCopyrightYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Fragment>
      <LoadingScreen />
      <div className="home container-fluid vh-100">
        <Nav theme="dark" textColor="light" />
        <div className="row h-75 d-flex align-items-center text-light ps-5">
          <div className="col-md-7">
            <h1>The first complaint support system in era 45s</h1>
            <div className="row">
              <div className="col-md-5 pt-4 ps-4">
                <div className="row">
                  <a href="#report" className="btn btn-block btn-danger">
                    make your report
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Waypoint onEnter={handleWaypointEnter} />
      <div className="overview container text-center">
        <div className="row">
          <div className="col-md-4">
            <h2>Total Reports</h2>
            <i className="overview__icon text-danger bi bi-file-check"></i>
            <h4 className="counter">40.000</h4>
          </div>
          <div className="col-md-4">
            <h2>Total Instance</h2>
            <i className="overview__icon text-danger bi bi-building"></i>
            <h4 className="counter">100.000</h4>
          </div>
          <div className="col-md-4">
            <h2>Total Users</h2>
            <i className="overview__icon text-danger bi bi-person"></i>
            <h4 className="counter">40.000</h4>
          </div>
        </div>
      </div>
      <div className="report px-5 container-fluid" id="report">
        <h3 className="text-center py-5 text-danger">Deliver your report</h3>
        <div className="row">
          <div className="col-md-5">
            <h4 className="fw-normal">
              before making a report, there are few things that must be
              considered :{" "}
            </h4>
            <ul className="report__list">
              <li>
                <i className="text-danger bi bi-check2"></i> Using formal
                grammar
              </li>
              <li>
                <i className="text-danger bi bi-check2"></i> Applying good
                ethics when making reports
              </li>
              <li>
                <i className="text-danger bi bi-check2"></i> Does not contain
                ethnicity, religion, race, and intergroup
              </li>
              <li>
                <i className="text-danger bi bi-check2"></i> Explain briefly,
                concisely and clearly
              </li>
            </ul>
          </div>
          <div className="col-md-7 ms-auto">
            <Form onSubmit={onSubmit} extClass="bg-light shadow rounded p-4">
              <InputGroup
                input={{
                  name: "title",
                  placeholder: "Report Title",
                  value: state.title,
                  handleChange: handleChange,
                  required: true,
                }}
              />
              <InputGroup>
                <Textarea
                  name="description"
                  rows={7}
                  value={state.description}
                  handleChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup
                inline
                extClass="mb-3"
                inputGroupText="The Date of Incident"
                input={{
                  type: "date",
                  name: "date",
                  value: state.date,
                  handleChange: handleChange,
                  required: true,
                }}
              />
              <InputGroup inline inputGroupText="Select City">
                <Select
                  name="city"
                  value={state.city}
                  handleChange={handleChange}
                  required
                >
                  {state.kota.map((e, i) => (
                    <Option key={i} value={e.nama} text={e.nama} />
                  ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Destination Instance"
                  name="destInstance"
                  value={state.destInstance}
                  handleChange={handleChange}
                  required
                />
              </InputGroup>
              <div
                id="indexAlert"
                className="alert alert-danger d-none"
                role="alert"
              >
                The attachment type must be jpeg/png
              </div>

              <div className="col-md-12 d-flex justify-content-between">
                <label htmlFor="file" className="position-relative">
                  <input
                    type="file"
                    name="attachment"
                    onChange={handleFileChange}
                    id="file"
                    className="indexFile text-light bg-light"
                  />
                  <p>{!state.fileName ? "No File chosen" : state.fileName}</p>
                </label>
                {state.attachment && (
                  <button
                    className="ms-4 btn btn-transparent"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Delete File"
                    onClick={handleDeleteFileInput}
                  >
                    <i className="bi bi-x-circle text-danger"></i>
                  </button>
                )}
                <button type="submit" className="btn btn-danger">
                  Report
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="footer">
        &copy; Copyright Report it {handleCopyrightYear()}
      </div>
    </Fragment>
  );
}
