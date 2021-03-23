import { Form, InputGroup } from "../components/Form";
import { REGISTER } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SideImage from "../assets/img/register-side.jpg";
import axios from "axios";
import $ from "jquery";
import LoadingScreen from "../layouts/LoadingScreen";
export default function Register() {
  const [state, setState] = useState({
    assigned_report: null,
    username: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleMessageEntry = (message) => {
    const messageEntry = ".message-entry";
    $(messageEntry).removeClass("d-none").text(message);
    setTimeout(
      () =>
        $(messageEntry).fadeTo(2000, 0, () => {
          $(messageEntry).addClass("d-none");
        }),
      2000
    );
  };

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      window.location.assign("/");
    }
  }, []);

  const handleSubmit = (e) => {
    $("#loading").removeClass("d-none");
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      const url = "http://localhost:2021/user";
      dispatch(REGISTER(state));
      axios
        .post(url, state)
        .then(({ data }) => {
          if (data === "Email already taken") {
            handleMessageEntry("Email already taken");
          } else {
            const token = JSON.stringify(data.token);
            const id = JSON.stringify(data.data["_id"]);
            const level = JSON.stringify(data.data["level"]);
            sessionStorage.setItem("auth-token", token);
            sessionStorage.setItem("id", id);
            sessionStorage.setItem("level", level);
            window.location.assign("/report");
          }
        })
        .catch((err) => {
          throw err;
        });
    } else {
      handleMessageEntry("Password and Confirm Password field must be same");
    }
  };

  return (
    <div className="d-flex overflow-hidden">
      <LoadingScreen />
      <div className="col-sm-12 col-md-12 col-lg-6 align-self-center p-5 rounded">
        <Form extClass="shadow p-5" onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div
            className="message-entry alert alert-danger d-none"
            role="alert"
          ></div>
          <InputGroup
            input={{
              type: "text",
              name: "username",
              value: state.username,
              placeholder: "Full Name",
              handleChange: handleChange,
            }}
          />
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
            inline
            inputGroupText="+62"
            input={{
              type: "number",
              name: "telephone",
              value: state.telephone,
              placeholder: "Telephone",
              handleChange: handleChange,
            }}
          />
          <InputGroup
            input={{
              type: "password",
              name: "password",
              value: state.password,
              placeholder: "Password",
              handleChange: handleChange,
            }}
          />
          <InputGroup
            input={{
              type: "password",
              name: "confirmPassword",
              value: state.confirmPassword,
              placeholder: "Confirm Password",
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
      <div className="col-lg-6 vh-100 d-none d-sm-none d-md-none d-lg-block">
        <img
          className="img-fluid"
          src={SideImage}
          alt="by Joel Filipe on Unsplash"
        />
      </div>
    </div>
  );
}
