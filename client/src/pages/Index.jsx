import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ADD_REPORT } from "../redux/actions";
import {
  Form,
  Input,
  InputGroup,
  Option,
  Select,
  Textarea,
} from "../components/Form";

const Index = () => {
  const dispatch = useDispatch();

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
    const url = "http://localhost:2021/complaint";
    axios
      .post(url, state)
      .then((data) => {
        window.location.assign("/report");
      })
      .catch((err) => {
        throw err;
      });
    dispatch(ADD_REPORT(state));
  };

  return (
    <div className="col-md-7 mx-auto mt-5">
      <Form extClass="rounded shadow bg-light p-4" onSubmit={onSubmit}>
        <h3 className="text-center mb-4 text-danger">Deliver your report</h3>
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
          <Select name="city" value={state.city} handleChange={handleChange}>
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
  );
};

export default Index;
