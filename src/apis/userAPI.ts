import axiosClient from "../axiosClient";

const userAPI = {
  getUsers: async () => {
    const url = "/users";
    return await axiosClient.get(url);
  },
  createUser: async (data: any) => {
    const url = "/users";
    return await axiosClient.post(url, data);
  },
  linkAccount: async (data: any) => {
    const url = "/linkacctofilter";
    return await axiosClient.post(url, data);
  },
};

export default userAPI;
