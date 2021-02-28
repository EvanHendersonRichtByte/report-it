import { Fragment } from "react";

const Form = ({ extClass, children }) => (
  <form className={extClass}>{children}</form>
);

const InputGroup = ({ inline, children, extClass, inputGroupText }) => (
  <div className={inline ? `input-group mb-3` : `${extClass} mb-3`}>
    {children}
    {inline && (
      <span className="input-group-text" id="basic-addon3">
        {inputGroupText}
      </span>
    )}
  </div>
);

const Input = ({ type, id, name, label, placeholder }) => (
  <Fragment>
    {label && labelElement(label, id)}
    <input
      name={name}
      type={type}
      id={id}
      className="form-control"
      placeholder={placeholder}
    />
  </Fragment>
);

const Textarea = ({ id, name, label, cols, rows, extClass, value }) => (
  <Fragment>
    {label && labelElement(label, id)}
    <textarea
      className={`form-control ${extClass}`}
      name={name}
      cols={cols}
      rows={rows}
      value={value}
    />
  </Fragment>
);

const Select = ({ id, name, children }) => (
  <select id={id} className="form-select" name={name}>
    {children}
  </select>
);

const Option = ({ value, text }) => <option value={value}>{text}</option>;

const labelElement = (label, id) => {
  label && (
    <label htmlFor={id} className="form-label">
      {label}
    </label>
  );
};

export { Form, InputGroup, Input, Textarea, Select, Option };
