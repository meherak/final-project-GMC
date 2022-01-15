const localStorageConfig = () => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
      _id: localStorage.getItem("agencyId"),
    },
  };

  return config;
};
export default localStorageConfig;
