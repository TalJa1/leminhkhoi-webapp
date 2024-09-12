import axiosClient from "../axiosClient";

const patientAPI = {
  getPatients: async () => {
    const url = "/patients";
    return await axiosClient.get(url);
  },
};

export default patientAPI;
