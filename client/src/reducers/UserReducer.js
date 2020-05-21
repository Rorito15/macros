export const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_INFO":
      return {
        loggedIn: action.updatedInfo.loggedIn,
        name: action.updatedInfo.name,
        email: action.updatedInfo.email
      };
    default:
      return state;
  }
};
