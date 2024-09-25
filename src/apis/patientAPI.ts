import axiosClient from "../axiosClient";

const patientAPI = {
  getPatients: async () => {
    const url = "/patient";
    return await axiosClient.get(url);
  },
  createPatient: async (data: any) => {
    const url = "/newpatient";
    return await axiosClient.post(url, data);
  },
  editPatient: async (data: any, patientId: number) => {
    const url = `/patient/${patientId}`;
    return await axiosClient.post(url, data);
  },
  getPatientByID: async (patientId: number) => {
    const url = `/patient/${patientId}`;
    return await axiosClient.get(url);
  },
  getPatientByAccountID: async (accountID: number) => {
    const url = `/patientbyaccid/${accountID}`;
    return await axiosClient.get(url);
  },
};

export default patientAPI;
