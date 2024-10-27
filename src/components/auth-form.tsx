import React from "react";
import { FaEye as Eye, FaEyeSlash as EyeOff } from "react-icons/fa";
import { LuLoader2 as Loader2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../store/user-provider";

interface AuthPropTypes {
  type: "LOGIN" | "REGISTER";
}

const AuthForm = ({ type }: AuthPropTypes) => {
  // states
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const { login, register } = useUserContext();
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const loginUser = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      await login(formData.email, formData.password);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      await register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center border border-[#C1C1C1] rounded-xl px-10">
      <p className="text-3xl font-semibold">
        {type === "REGISTER" ? "Create an Account" : "Login"}
      </p>

      {type === "LOGIN" && (
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-2xl font-medium text-center">
            Welcome back to ECOMMERCE
          </p>
          <p className="text-lg text-center">
            The next gen business marketplace
          </p>
        </div>
      )}

      <form
        onSubmit={type === "REGISTER" ? registerUser : loginUser}
        className="w-full flex flex-col gap-4"
      >
        {type === "REGISTER" && (
          <div className="flex flex-col justify-center items-start gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              placeholder="Enter your name"
              id="name"
              className="w-full p-3 border border-[#C1C1C1] rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col justify-center items-start gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            placeholder="Enter your email"
            id="email"
            className="w-full p-3 border border-[#C1C1C1] rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center items-start gap-1 relative">
          <label htmlFor="password">Password</label>
          <input
            type={!showPassword ? "password" : "text"}
            id="password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 border border-[#C1C1C1] rounded-lg"
          />
          <button
            className="absolute top-[29.5%] right-3"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>

          <button
            className="w-full bg-black p-3 rounded-lg text-white my-3 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={25} />
            ) : type === "REGISTER" ? (
              "CREATE ACCOUNT"
            ) : (
              "LOGIN"
            )}
          </button>
        </div>
      </form>
      <div>
        <p>
          <span className="text-[#333333]">
            {type === "REGISTER" ? "Have" : "Don't have"} an Account?{" "}
          </span>
          <Link to={type === "REGISTER" ? "/login" : "/register"}>
            {type === "REGISTER" ? "LOGIN" : "REGISTER"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
