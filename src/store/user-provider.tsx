import React, { createContext, useContext } from "react";
import { ID, Models } from "appwrite";
import { account } from "../appwrite/config";
import { LuLoader2 as Loader2 } from "react-icons/lu";

export interface UserContextType {
  user: Models.User<any> | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  getUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // states
  const [user, setUser] = React.useState<Models.User<any> | null>(null);
  const [loading, setLoading] = React.useState(true); // initially it's false to show a spinner

  // Method to get currently logged in user
  const getUser = async () => {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Login method
  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser(user);

      // if the email is not verified send a verification mail
      if (!user.emailVerification) {
        console.log("sending mail...");

        await account.createVerification("http://localhost:5173/verify-email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Register method
  const register = async (name: string, email: string, password: string) => {
    try {
      // register the user
      await account.create(ID.unique(), email, password, name);

      // then login the user
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  // Logout the user and clear user state
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const contextData = {
    user,
    login,
    register,
    logout,
    getUser,
  };

  return (
    <UserContext.Provider value={contextData}>
      {loading ? (
        <div className="w-full h-[100dvh] flex justify-center items-center">
          <Loader2 className="animate-spin" size={100} />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext) as UserContextType;

export default UserContext;
