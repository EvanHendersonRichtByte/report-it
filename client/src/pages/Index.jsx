import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Nav from "../layouts/Nav";
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
    kota: [],
    user_id: sessionStorage.getItem("id"),
    title: "",
    description: "",
    date: "",
    city: "Kota Malang",
    destInstance: "",
    attachment: "",
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
    e.preventDefault();
    if (!state.user_id) {
      window.location.assign("/register");
    } else {
      const url = "https://id-report-id.herokuapp.com/complaint";
      axios
        .post(url, state)
        .then((data) => {
          window.location.assign("/report");
        })
        .catch((err) => {
          throw err;
        });
      dispatch(ADD_REPORT(state));
    }
  };

  const handleCopyrightYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Fragment>
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
      <div className="overview container text-center">
        <div className="row">
          <div className="col-md-4">
            <h2>Total Reports</h2>
            <i className="overview__icon text-danger bi bi-alarm"></i>
            <h4>40.000</h4>
          </div>
          <div className="col-md-4">
            <h2>Total Instance</h2>
            <i className="overview__icon text-danger bi bi-building"></i>
            <h4>100.000</h4>
          </div>
          <div className="col-md-4">
            <h2>Total Users</h2>
            <i className="overview__icon text-danger bi bi-person"></i>
            <h4>40.000</h4>
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
            <Form extClass="rounded shadow bg-light p-4" onSubmit={onSubmit}>
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
      <div className="footer">
        &copy; Copyright Report it {handleCopyrightYear()}
      </div>
    </Fragment>
  );
};

export default Index;
