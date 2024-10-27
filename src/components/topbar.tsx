import { Link } from "react-router-dom";
import { GoSearch as SearchIcon } from "react-icons/go";
import { BsCart as CartIcon } from "react-icons/bs";
import { useUserContext } from "../store/user-provider";

const TopBar = () => {
  const { user } = useUserContext();

  return (
    <nav className="w-full flex flex-col justify-center items-center gap-6 p-3">
      <div className="w-full flex justify-end items-center gap-6 text-sm text-[#333333]">
        <p>Help</p>
        <p>Orders & Returns</p>
        {user && <p>Hi, {user.name}</p>}
      </div>

      <div
        className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3
      "
      >
        <div>
          <Link to={"#"} className="text-3xl font-bold">
            ECOMMERCE
          </Link>
        </div>
        <div className="flex justify-center items-center gap-2 lg:gap-10 flex-wrap font-semibold text-sm lg:text-base">
          <Link to={"#"}>Categories</Link>
          <Link to={"#"}>Sales</Link>
          <Link to={"#"}>Clearance</Link>
          <Link to={"#"}>New Stock</Link>
          <Link to={"#"}>Trending</Link>
        </div>
        <div className="flex justify-center items-center gap-2 lg:gap-6 text-[#333333] ml-auto lg:ml-0">
          <SearchIcon size={20} />
          <CartIcon size={20} />
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
