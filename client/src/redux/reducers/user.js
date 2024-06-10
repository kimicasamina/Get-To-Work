const userReducer = (user = null, action) => {
  switch (action.type) {
    case "ADD_CURRENT_USER":
      return action.payload;
    case "DELETE_USER":
      return action.payload;
    default:
      return user;
  }
};

export default userReducer;
