import ProtectAuth from "../../../protected/protect-auth";
import Register from "./register";

const RegisterPage = () => {
  return (
    <ProtectAuth>
      <Register />
    </ProtectAuth>
  );
};

export default RegisterPage;
