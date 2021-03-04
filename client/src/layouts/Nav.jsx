import { useState } from "react";
import { Fragment } from "react";
import { Navbar, NavbarList, NavbarItem } from "../components/Navbar";
import {
  Form,
  Input,
  InputGroup,
  Option,
  Select,
  Textarea,
} from "../components/Form";

const handleLogout = () => {
  sessionStorage.clear();
  window.location.reload();
};

const isSigned = () => {
  let token = sessionStorage.getItem("auth-token");
  token = JSON.parse(token);
  if (token) {
    return (
      <Fragment>
        <NavbarItem navLink={navLink("Report", "report")} />
        <NavbarItem>
          <button
            className="btn btn-transparent align-text-bottom pt-2 text-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Report
          </button>
        </NavbarItem>
      </Fragment>
    );
  } else {
    return <NavbarItem navLink={navLink("Home", "/", "active")} />;
  }
};

const isLogged = () => {
  let token = sessionStorage.getItem("auth-token");
  token = JSON.parse(token);
  if (token) {
    return (
      <NavbarItem>
        <button onClick={handleLogout} className="btn btn-transparent">
          Sign Out
        </button>
      </NavbarItem>
    );
  } else {
    return (
      <Fragment>
        <NavbarItem navLink={navLink("Sign in", "login")} />
        <NavbarItem
          navLink={navLink(
            "Sign up",
            "register",
            "btn btn-outline-secondary ms-2"
          )}
        />
      </Fragment>
    );
  }
};

const navLink = (title, redirect, extClass) => {
  return { title, redirect, extClass };
};

export default function Nav() {
  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const [state, setState] = useState({
    title: "",
    description: "",
    date: "",
    city: "Jakarta",
    destInstance: "",
    attachment: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Navbar
      brand="Report it"
      expandBreakpoint="sm"
      extClass="bg-transparent navbar-light p-3 shadow"
    >
      <NavbarList>{isSigned()}</NavbarList>
      <NavbarList extClass="ms-auto">{isLogged()}</NavbarList>
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
                  }}
                />
                <InputGroup>
                  <Textarea
                    name="description"
                    rows={7}
                    value={state.description}
                    handleChange={handleChange}
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
                  }}
                />
                <InputGroup inline inputGroupText="Select City">
                  <Select
                    name="city"
                    value={state.city}
                    handleChange={handleChange}
                  >
                    <Option value="Malang" text="Malang" />
                    <Option value="Surabaya" text="Surabaya" />
                    <Option value="Jakarta" text="Jakarta" />
                  </Select>
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Destination Instance"
                    name="destInstance"
                    value={state.destInstance}
                    handleChange={handleChange}
                  />
                </InputGroup>
                <label className="mb-2" htmlFor="file">
                  Upload Attachment
                </label>
                <div className="col-md-12 d-flex justify-content-between">
                  <input
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    id="file"
                  />
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
