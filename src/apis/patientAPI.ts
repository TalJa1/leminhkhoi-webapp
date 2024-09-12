import axiosClient from "../axiosClient";

const patientAPI = {
  getPatients: async () => {
    const url = "/patient";
    return await axiosClient.get(url);
  },
};

export default patientAPI;
