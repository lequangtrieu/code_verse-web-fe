export const getAuthInfo = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  return {
    username,
    token,
    refreshToken,
  };
};
export default getAuthInfo;
