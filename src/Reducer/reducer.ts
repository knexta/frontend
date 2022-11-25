interface state {
  emailid: string;
  userid: string;
}
interface action {
  type: string;
  payload: string;
}

export const reducer = (state: state, action: action) => {
  console.log(action);
  console.log("in action")
  switch (action.type) {
    case "addEmailid":
      console.log(state);
      return { ...state, emailid: action.payload };
    case "addUserid":
      console.log(state);
      return { ...state, userid: action.payload };

    default:
      throw new Error("Unexpected action");
  }
};
