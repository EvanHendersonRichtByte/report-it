const initialState = {
  fullName: "",
  username: "",
  password: "",
  telephone: "",
};

const USER_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return action.payload;
    default:
      return state;
  }
};

export default USER_REDUCER;
