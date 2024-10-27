import {
  FaLessThan as LessThanIcon,
  FaGreaterThan as GreaterThanIcon,
} from "react-icons/fa6";

const DiscountBanner = () => {
  return (
    <div className="bg-[#F4F4F4] flex justify-center items-center gap-5 py-3">
      <LessThanIcon />
      <span>Get 10% off on business sign up</span>
      <GreaterThanIcon />
    </div>
  );
};

export default DiscountBanner;
