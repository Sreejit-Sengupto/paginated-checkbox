import AuthForm from "../../../components/auth-form";

const Register = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[90%] h-[90%] lg:w-[576px] lg:h-[601px]">
        <AuthForm type="REGISTER" />
      </div>
    </div>
  );
};

export default Register;
