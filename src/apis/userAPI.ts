import axiosClient from "../axiosClient";

const userAPI = {
  getUsers: async () => {
    const url = "/users";
    return await axiosClient.get(url);
  },
};

export default userAPI;
