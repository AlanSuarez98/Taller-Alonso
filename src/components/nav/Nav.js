// Nav.js
import "./Nav.css";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../service/AuthContext";

const Nav = () => {
  "";
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/iniciar-sesion");
  };
  const handleHome = () => {
    navigate("/");
  };

  const shifts = () => {
    navigate("/turnos");
  };

  const handleAccount = () => {
    if (user?.isAdmin) {
      navigate("/administracion");
    } else {
      navigate("/mi-cuenta");
    }
  };
  return (
    <div className="nav">
      <div className="logo" onClick={handleHome}>
        <img src={logo} alt="Logo Alosno" />
        <h2>Alonso</h2>
      </div>
      <div className="textNav">
        {isAuthenticated ? (
          <>
            <button className="btnHome" onClick={handleHome}>
              Inicio
            </button>
            <button className="shifts" onClick={shifts}>
              Turnos
            </button>
            <button className="btnLogin" onClick={handleAccount}>
              Mi cuenta
            </button>
          </>
        ) : (
          <>
            <button className="btnHome" onClick={handleHome}>
              Inicio
            </button>
            <button className="shifts" onClick={shifts}>
              Turnos
            </button>
            <button className="btnLogin" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
