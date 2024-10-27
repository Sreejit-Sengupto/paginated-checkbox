import React from "react";
import { useSearchParams } from "react-router-dom";
import { account } from "../../appwrite/config";
import { FaCircleXmark as CircleX } from "react-icons/fa6";
import { FaCheckCircle as CheckCircle } from "react-icons/fa";
import { FiLoader as Loader } from "react-icons/fi";

const VerifyEmail = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const [verified, setVerified] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const verifyEmail = async () => {
    try {
      const userId = queryParams.get("userId");
      const secret = queryParams.get("secret");

      // pass the userId and secret from the query parameters to the verification method
      const result = await account.updateVerification(userId!, secret!);

      console.log("Verification successfull!", result);

      if (result) {
        setVerified(true);
      }
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  React.useEffect(() => {
    // Run the verification method as soon as the page loads or the query params changes
    verifyEmail();
  }, [queryParams, setQueryParams]);

  return (
    <div className="flex flex-col w-full h-[100dvh] justify-center items-center font-garamond">
      {verified ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="flex justify-center items-center gap-1 text-2xl font-semibold">
            <span>
              <CheckCircle color="green" size={40} />
            </span>
            <span>Verification Successfull</span>
          </p>
          <p className="text-center text-gray-500">
            You can close this page now
          </p>
        </div>
      ) : err ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="flex justify-center items-center gap-1 text-2xl font-semibold">
            <span>
              <CircleX color="red" size={40} />
            </span>
            <span>Verification Failed</span>
          </p>
          <p className="text-center text-gray-500">
            Verification failed. Please try again!
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <p>
            <Loader className="animate-spin" color="#443dff" size={50} />
          </p>
          <p className="text-xl">Verifying your Email...</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
