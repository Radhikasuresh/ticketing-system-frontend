// loginAction.js
export const loginAction = (user) => ({
  type: "LOGIN",
  payload: user,
});

// logoutAction.js
export const logoutAction = () => ({
  type: "LOGOUT",
});
