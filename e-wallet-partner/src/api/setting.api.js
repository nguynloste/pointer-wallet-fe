import axiosInstance from "../configs/axios.config";
export const updateProfile = async (formData) => {
  return await axiosInstance.post(
    process.env.REACT_APP_API + "/api/v1/partner/edit-profile",
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
