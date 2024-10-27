import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../store/user-provider";
import { LuLoader2 as Loader2 } from "react-icons/lu";

const ProtectAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    getActiveUser();
  }, []);

  // If the user doesn't exists just return else redirect to home page
  const getActiveUser = async () => {
    if (!user) {
      console.log("No user");
      setFetched(true);
      return;
    }
    navigate("/");
  };

  // show a loader until a decision is made (sending user to home page or rendering the login page)
  return !fetched ? (
    <div className="h-[100dvh] w-full flex justify-center items-center">
      <Loader2 className="animate-spin" size={100} />
      Loading...
    </div>
  ) : (
    children
  );
};

export default ProtectAuth;
