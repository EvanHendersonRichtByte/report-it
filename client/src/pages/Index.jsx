import { Fragment } from "react";
import { connect } from "react-redux";
import {
  Navbar,
  NavbarList,
  NavbarItem,
  NavbarLink,
} from "../components/Navbar";
import {
  Form,
  Input,
  InputGroup,
  Option,
  Select,
  Textarea,
} from "../components/Form";

const Index = (props) => {
  return (
    <Fragment>
      <Navbar
        brand="Report it"
        expandBreakpoint="sm"
        extClass="bg-transparent navbar-light p-4"
      >
        <NavbarList>
          <NavbarItem>
            <NavbarLink extClass="active" title="Home" redirect="/" />
          </NavbarItem>
          <NavbarItem>
            <NavbarLink title="About" redirect="about" />
          </NavbarItem>
        </NavbarList>
        <NavbarList extClass="ms-auto">
          <NavbarItem>
            <NavbarLink title="Sign in" redirect="login" />
          </NavbarItem>
          <NavbarItem>
            <a className="btn btn-outline-secondary ms-2" href="register">
              Sign up
            </a>
          </NavbarItem>
        </NavbarList>
      </Navbar>
      <div className="col-md-7 mx-auto mt-5">
        <Form extClass="rounded shadow bg-light p-4">
          <h3 className="text-center mb-4 text-danger">Deliver your report</h3>
          <InputGroup>
            <Input placeholder="Report Title" />
          </InputGroup>
          <InputGroup>
            <Textarea value={"Report Description"} rows={7} />
          </InputGroup>
          <InputGroup
            inline
            extClass="mb-3"
            inputGroupText="The Date of Incident"
          >
            <Input type="date" />
          </InputGroup>
          <InputGroup inline inputGroupText="Select City">
            <Select>
              <Option value="Malang" text="Malang" />
              <Option value="Surabaya" text="Surabaya" />
              <Option value="Jakarta" text="Jakarta" />
            </Select>
          </InputGroup>
          <InputGroup>
            <Input placeholder="Destination Instance" />
          </InputGroup>
          <label className="mb-2" htmlFor="file">
            Upload Attachment
          </label>
          <div className="col-md-12 d-flex justify-content-between">
            <input type="file" name="file" id="file" />
            <button type="submit" className="btn btn-danger">
              Report
            </button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default connect((state) => state.report)(Index);
