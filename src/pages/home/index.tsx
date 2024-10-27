import Home from "./home";
import { ProductContextProvider } from "../../store/product-provider";
import RequireAuth from "../../protected/require-auth";

const HomePage = () => {
  return (
    <RequireAuth>
      <ProductContextProvider>
        <Home />
      </ProductContextProvider>
    </RequireAuth>
  );
};

export default HomePage;
