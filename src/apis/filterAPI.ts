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
  editFilter: async (id: string, data: any) => {
    const url = `/filter/${id}`;
    return await axiosClient.post(url, data);
  },
};

export default filterAPI;
