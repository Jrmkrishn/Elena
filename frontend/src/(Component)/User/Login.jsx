import { Button } from "../Button";
import Container from "../Container";
import { Input } from "../Input";
import { LoginApi } from "@/api/Auth";
import { useNavigate } from "react-router-dom";
import { asyncHandler } from "@/utils/asyncHandler";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    const response = await asyncHandler(LoginApi(user));
    console.log(response);

    if (response) {
      console.log(response);
      toast.success(response.message);
      navigate("/user");
    }
  };
  return (
    <Container className={"w-full h-screen"}>
      <h1 className="font-semibold text-2xl sm:text-4xl">Login</h1>
      <div className="flex flex-col gap-5 max-w-sm w-full py-10">
        <Input
          name="email"
          value={user.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
        />
        <Input
          name="password"
          value={user.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
      </div>
      <Button onClick={handleLogin} text={"Login"} />
    </Container>
  );
};

export default Login;
