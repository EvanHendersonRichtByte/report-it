import { useState } from "react";
import axios from "axios";
import { Form, InputGroup } from "../components/Form";
import SideImage from "../assets/img/login-side.jpg";
export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:2021/user/auth";
    axios
      .post(url, state)
      .then((response) => {
        sessionStorage.setItem(
          "auth-token",
          JSON.stringify(response.data.token)
        );
        window.location = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div className="col-sm-12 col-md-12 col-lg-6 align-self-center p-5">
        <Form extClass="shadow p-5 rounded" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <InputGroup
            input={{
              type: "email",
              name: "email",
              value: state.email,
              placeholder: "Full Name",
              handleChange: handleChange,
            }}
          />
          <InputGroup
            input={{
              type: "password",
              id: "password",
              name: "password",
              label: "Password",
              value: state.password,
              placeholder: "Password",
              handleChange: handleChange,
            }}
          />
          <div className="d-flex">
            <a href="/" className="">
              &lt; Go Back
            </a>
            <button type="submit" className="btn btn-success ms-auto">
              Submit
            </button>
          </div>
        </Form>
      </div>
      <div className="col-lg-6 d-none d-sm-none d-md-none d-lg-block">
        <img
          className="img-fluid"
          src={SideImage}
          alt="by Solen Feyissa on Unsplash"
        />
      </div>
    </div>
  );
}
