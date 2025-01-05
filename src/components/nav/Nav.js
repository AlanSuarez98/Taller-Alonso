import "./Nav.css";
import logo from "../../assets/Logo.png";
import Icon from "../icon/Icon";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../service/AuthContext";

const Nav = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);

  const handleLogin = () => {
    navigate("/iniciar-sesion");
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
      <div className="logo">
        <img src={logo} alt="Logo Alosno" />
        <h2>Alonso</h2>
      </div>
      <div className="textNav">
        {isAuthenticated ? (
          <>
            <button className="shifts" onClick={shifts}>
              Turnos
            </button>
            <button className="btnLogin" onClick={handleAccount}>
              Mi cuenta
            </button>
            {user?.isAdmin && (
              <button className="btnSetting">
                <Icon icon={faWrench} />
              </button>
            )}
          </>
        ) : (
          <>
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
