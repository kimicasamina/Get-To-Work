import axios from "axios";

export const deleteUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/user/logout");
    dispatch({ type: "DELETE_USER", payload: null });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const signInUser = (forminput) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/login", forminput);
    console.log("loginUser hit", data);
    return data;
  } catch (err) {
    console.log(err);
    toast.error(data.message);
  }
};
