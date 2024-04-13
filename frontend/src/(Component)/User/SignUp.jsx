import { useState } from "react";
import { Button } from "../Button";
import Container from "../Container";
import { Input } from "../Input";
import { SignUpApi } from "@/api/Auth";
import { useNavigate } from "react-router-dom";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSignup = async () => {
    const response = await asyncHandler(SignUpApi(user));
    if (response) {
      toast.success(response.message);
      navigate("/user");
    }
  };
  return (
    <Container className={"w-full h-screen"}>
      <h1 className="font-semibold text-2xl sm:text-4xl">SignUp</h1>
      <div className="flex flex-col gap-5 max-w-sm w-full py-10">
        <Input
          value={user.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />
        <Input
          value={user.username}
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
        />
        <Input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <Button onClick={handleSignup} text={"Signup"} />
    </Container>
  );
};

export default SignUp;
