import { useState } from "react";
import { Form, InputGroup } from "../components/Form";
export default function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div className="col-md-6 mx-auto mt-5">
      <Form extClass="shadow p-5">
        <h3>Register</h3>
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
          <button type="submit" className="btn  btn-success ms-auto">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
