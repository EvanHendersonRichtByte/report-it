const initialState = {
  title: "",
  description: "",
  date: "",
  city: "Kota Malang",
  destInstance: "",
  attachment: null,
  fileName: "",
};

const REPORT_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REPORT":
      console.log(action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default REPORT_REDUCER;
