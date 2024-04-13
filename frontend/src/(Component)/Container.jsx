/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center flex-col font-Montserrat",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
