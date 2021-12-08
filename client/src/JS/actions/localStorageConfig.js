const localStorageConfig = () => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
      _id: localStorage.getItem("agencyId"),
    },
  };
  console.log(config);

  return config;
};
export default localStorageConfig;
