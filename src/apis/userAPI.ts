import axiosClient from "../axiosClient";

const userAPI = {
  getUsers: async () => {
    const url = "/todos/1";
    return await axiosClient.get(url);
  },
};

export default userAPI;
