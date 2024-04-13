/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

export const Button = ({ text, className, ...props }) => {
  return (
    <button {...props} className={cn("w-40 bg-gray-200 px-4 py-2 rounded hover:bg-gray-400 hover:text-gray-100 hover:shadow-md font-semibold", className)}>
      {text}
    </button>
  );
};
