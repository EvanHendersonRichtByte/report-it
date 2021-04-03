import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import { Form, InputGroup } from "../components/Form";
import SideImage from "../assets/img/login-side.jpg";
import LoadingScreen from "../layouts/LoadingScreen";
export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    $(".message-entry").hide();
    if (sessionStorage.getItem("auth-token")) {
      window.location.assign("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/user/auth";
    axios
      .post(url, state)
      .then(({ data }) => {
        if (typeof data === "object") {
          $("#loading").removeClass("d-none");
          sessionStorage.setItem("auth-token", JSON.stringify(data.token));
          sessionStorage.setItem("id", JSON.stringify(data.data["_id"]));
          sessionStorage.setItem("level", JSON.stringify(data.data["level"]));
          sessionStorage.setItem(
            "assigned_report",
            JSON.stringify(data.data["assigned_report"])
          );
          window.location = "/";
        } else {
          $(".message-entry").show(0, "", () => {
            setTimeout(() => {
              $(".message-entry").fadeOut(1000);
            }, 2000);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="lsp d-flex vh-100 overflow-hidden">
      <LoadingScreen />
      <div className="col-sm-12 col-md-12 col-lg-6 align-self-center p-5">
        <Form extClass="shadow p-5 rounded" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="message-entry alert alert-danger" role="alert">
            Invalid Credentials
          </div>
          <InputGroup
            input={{
              type: "email",
              name: "email",
              value: state.email,
              placeholder: "Email",
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
