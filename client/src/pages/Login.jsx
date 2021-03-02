import { useState } from "react";
import { Form, InputGroup } from "../components/Form";
export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div className="col-md-6 mx-auto mt-5">
      <Form extClass="shadow p-5">
        <h3>Login</h3>
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
            type: "password",
            name: "password",
            value: state.password,
            placeholder: "Password",
            handleChange: handleChange,
          }}
        />
        <div className="d-flex">
          <a href="/" className="">
            &lt; Go Back
          </a>
          <button type="submit" className="btn  btn-success ms-auto">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
