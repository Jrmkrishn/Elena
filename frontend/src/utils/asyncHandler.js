import { toast } from "react-toastify";

export const asyncHandler = async (asyncFunction) => {
  return await Promise.resolve(asyncFunction).catch((error) => {
    console.log(error.response);
    toast.error(error.response.data.message);
  });
};
