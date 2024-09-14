import axiosClient from "../axiosClient";

const filterAPI = {
  getFilters: async () => {
    const url = "/filter";
    return await axiosClient.get(url);
  },
};

export default filterAPI;