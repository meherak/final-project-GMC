const getToken = () => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  return config;
};
export default getToken;
