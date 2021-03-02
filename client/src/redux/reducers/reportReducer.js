const initialState = {
  title: "",
  description: "",
  date: "",
  city: "",
  destInstance: "",
  attachment: "",
};

const REPORT_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REPORT":
      return action.payload;
    default:
      return state;
  }
};

export default REPORT_REDUCER;
