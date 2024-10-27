import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/home";
import VerifyEmail from "./pages/emails/verify-email";
import { UserContextProvider } from "./store/user-provider";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="/verify-email" element={<VerifyEmail />} />
    </>
  )
);

const App = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
