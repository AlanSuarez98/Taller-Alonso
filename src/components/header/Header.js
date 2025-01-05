import "./Header.css";
import header from "../../assets/Header.jpg";

const Header = () => {
  return (
    <div className="header">
      <img src={header} alt="imagen header" />
    </div>
  );
};

export default Header;
