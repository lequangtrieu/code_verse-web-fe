export const setAuthInfo = ({ username, token, refreshToken }) => {
    if (username) localStorage.setItem("username", username);
    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  };
  
  export default setAuthInfo;