import { Fragment } from "react";

const Form = ({ onSubmit, extClass, children }) => (
  <form onSubmit={onSubmit} className={extClass}>
    {children}
  </form>
);

const InputGroup = ({
  inline,
  children,
  extClass = "",
  inputGroupText,
  input,
}) => {
  const isInline = (component) => {
    if (inline) {
      return (
        <Fragment>
          <span className="input-group-text">{inputGroupText}</span>
          {component}
        </Fragment>
      );
    }
  };
  const mainElement = (component) => (
    <div className={inline ? `input-group mb-3` : `${extClass} mb-3`}>
      {!inline && component}
      {isInline(component)}
    </div>
  );

  if (input) {
    return mainElement(Input(input));
  } else {
    return mainElement(children);
  }
};

const Input = ({
  type,
  id,
  name,
  label,
  placeholder,
  value,
  handleChange,
  extClass = "",
}) => (
  <Fragment>
    {label && labelElement(label, id)}
    <input
      name={name}
      type={type}
      id={id}
      className={`form-control ${extClass}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  </Fragment>
);

const Textarea = ({
  id,
  name,
  label,
  cols,
  rows,
  extClass,
  value,
  handleChange,
}) => (
  <Fragment>
    {label && labelElement(label, id)}
    <textarea
      className={`form-control ${extClass}`}
      name={name}
      cols={cols}
      rows={rows}
      value={value}
      onChange={handleChange}
    />
  </Fragment>
);

const Select = ({ id, name, value, children, handleChange }) => (
  <select
    id={id}
    className="form-select"
    value={value}
    name={name}
    onChange={handleChange}
  >
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
