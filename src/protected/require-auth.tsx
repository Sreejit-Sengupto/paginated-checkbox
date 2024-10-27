import React from "react";
import { Navigate } from "react-router-dom";
import VerificationPrompt from "../pages/emails/verify-prompt";
import { useUserContext } from "../store/user-provider";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUserContext();

  // If the user exists, then check if the user's email is verified or not.
  // If email is not verified then show the verification prompt page
  // Else render the home page
  // If the user doesn't exists redirect to login page
  return user ? (
    user.emailVerification ? (
      children
    ) : (
      <VerificationPrompt />
    )
  ) : (
    <Navigate to={"/login"} />
  );
};

export default RequireAuth;
