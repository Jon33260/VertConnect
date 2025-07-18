import axios, { AxiosError } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const postCreateUser = async (userData: UtilisateurTypes) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data || "Failed to create user");
    }
    throw new Error("Failed to create user");
  }
};

export { postCreateUser };
