import ProtectAuth from "../../../protected/protect-auth";
import Login from "./login";

const LoginPage = () => {
  return (
    <ProtectAuth>
      <Login />
    </ProtectAuth>
  );
};

export default LoginPage;
