import { LuMailCheck as MailCheck } from "react-icons/lu";
import React from "react";
import { account } from "../../appwrite/config";

const VerificationPrompt = () => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  // Method for re-sending verification mail
  const resendVerificationMail = async () => {
    try {
      setBtnDisabled(true); // disable the button
      alert("Mail sent");
      await account.createVerification("http://localhost:5173/verify-email");
    } catch (error) {
      console.error(error);
    }
  };

  // enable the button again after 20s
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBtnDisabled(false);
    }, 20000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center items-center gap-3 font-poppins">
      <h1 className="font-semibold text-2xl text-center flex flex-col gap-1 justify-center items-center text-textPrimary">
        <span>
          <MailCheck size={100} color="#FC356C" />
        </span>
        <span>Verification Mail sent to your Registered Email</span>
      </h1>
      <p className="text-sm text-textSecondary text-center">
        Plese verify your email and refresh this page to continue to your
        Dashboard.
      </p>

      <button
        className="bg-black p-3 rounded-lg text-white"
        onClick={resendVerificationMail}
        disabled={btnDisabled}
      >
        Resend Verification Code
      </button>
    </div>
  );
};

export default VerificationPrompt;
