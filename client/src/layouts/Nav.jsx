import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { Navbar, NavbarList, NavbarItem } from "../components/Navbar";
import {
  Form,
  Input,
  InputGroup,
  Option,
  Select,
  Textarea,
} from "../components/Form";
import LoadingScreen from "./LoadingScreen";

const isSigned = (textColor) => {
  let level = sessionStorage.getItem("level");
  level = JSON.parse(level);
  if (level === "User") {
    return (
      <Fragment>
        <NavbarItem
          navLink={navLink("Report", "report", `text-${textColor}`)}
        />
        <NavbarItem>
          <button
            className={`btn btn-transparent align-text-bottom pt-2 text-${textColor}`}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Report
          </button>
        </NavbarItem>
      </Fragment>
    );
  } else if (level === "Employee") {
    return <NavbarItem navLink={navLink("Dashboard", "/employee", "active")} />;
  } else {
    return <NavbarItem navLink={navLink("Home", "/", "active")} />;
  }
};

const isLogged = (textColor) => {
  let token = sessionStorage.getItem("auth-token");
  token = JSON.parse(token);
  if (token) {
    return (
      <NavbarItem>
        <button
          onClick={handleLogout}
          className={`btn btn-transparent text-${textColor}`}
        >
          Sign Out
        </button>
      </NavbarItem>
    );
  } else {
    return (
      <Fragment>
        <NavbarItem
          navLink={navLink("Sign in", "login", `text-${textColor}`)}
        />
        <NavbarItem
          navLink={navLink(
            "Sign up",
            "register",
            `btn btn-outline-${textColor} ms-2 text-${textColor}`
          )}
        />
      </Fragment>
    );
  }
};

const handleLogout = () => {
  sessionStorage.clear();
  window.location.reload();
};

const navLink = (title, redirect, extClass) => {
  return { title, redirect, extClass };
};

export default function Nav({
  theme = "light",
  textColor = "secondary",
  extClass = "",
}) {
  const [state, setState] = useState({
    kota: [],
    user_id: JSON.parse(sessionStorage.getItem("id")),
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

  const handleDeleteFileInput = () => {
    setState((state) => ({ ...state, attachment: null, fileName: "" }));
  };

  const handleChange = (e) => {
    if (e.target.name === "attachment") {
      if ($("#file")[0].files.length > 0) {
        const type = $("#file")[0].files[0].type;
        if (type === "image/jpeg" || type === "image/png") {
          setState((state) => ({
            ...state,
            attachment: e.target.files[0],
            fileName: e.target.files[0].name,
          }));
        } else {
          const alertElement = ".alert";
          $(alertElement).removeClass("d-none");
          setTimeout(() => {
            $(alertElement).fadeTo(2000, 0, () => {
              $(alertElement).addClass("d-none");
              $(alertElement).fadeTo(0, 1);
            });
          }, 2000);
        }
      }
    } else {
      setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  return (
    <Navbar
      brand="Report it"
      expandBreakpoint="sm"
      extClass={`bg-transparent navbar-${theme} p-3 ${extClass}`}
    >
      <NavbarList>{isSigned(textColor)}</NavbarList>
      <NavbarList extClass="ms-auto">{isLogged(textColor)}</NavbarList>
      <LoadingScreen customId="nav-loading" />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Report
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Form onSubmit={onSubmit}>
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
                <label className="mb-2" htmlFor="file">
                  Upload Attachment
                </label>
                <div className="alert alert-danger d-none" role="alert">
                  The attachment type must be jpeg/png
                </div>
                <div className="col-md-12 d-flex justify-content-between">
                  <label htmlFor="file" className="position-relative">
                  <input
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    id="file"
                    className="text-light bg-light"
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
      </div>
    </Navbar>
  );
}
