export const reducer = (state, action) => {
    console.log(action)
  switch (action.type) {
    case "addEmailid":
        console.log(state)
      return { ...state, emailid: action.payload };
    case "addUserid":
        console.log(state)
      return { ...state, userid: action.payload };

    default:
      throw new Error("Unexpected action");
  }
};
