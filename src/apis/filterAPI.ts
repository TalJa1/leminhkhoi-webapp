import axiosClient from "../axiosClient";

const filterAPI = {
  getFilters: async () => {
    const url = "/filter";
    return await axiosClient.get(url);
  },
  createFilter: async () => {
    const url = "/newFilter";
    return await axiosClient.post(url);
  },
};

export default filterAPI;
