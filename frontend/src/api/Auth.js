import { BACKEND_API } from "@/config/config";

export const SignUpApi = async (user) => {
  console.log(user);
  const response = await BACKEND_API.post("/api/v1/users/register", user);
  return response.data;
};
export const LoginApi = async (user) => {
  const response = await BACKEND_API.post("/api/v1/users/login", user);
  return response.data;
};
export const LogoutApi = async () => {
  const response = await BACKEND_API.post("/api/v1/users/login");
  return response.data;
};
