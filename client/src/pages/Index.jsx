import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Image from "../assets/img/index.jpg";
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

  (() => {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=35")
      .then((response) =>
        setState((state) => ({ ...state, kota: response.data.kota_kabupaten }))
      )
      .catch((err) => console.log(err));
  })();

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

  return (
    <Fragment>
      <div className="container p-5 d-flex justify-content-around">
        <div className="row">
          <div className="col-md-5">
            <img
              className="img-fluid rounded"
              src={Image}
              alt="by LumenSoft Technologies"
            />
          </div>
          <div className="col-md-7 lh-md d-flex flex-column justify-content-center">
            <h2 className="d-block">The First Complaint Support on Era 45s</h2>
            <p className="d-block">
              We ensure greater resources that pull out the body out of the box
            </p>
            <button className="btn btn-danger btn-inline w-25">
              Make your report
            </button>
          </div>
        </div>
      </div>
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
    </Fragment>
  );
};

export default Index;
