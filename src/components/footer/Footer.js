import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Icon from "../icon/Icon";
import "./Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer">
      <div className="topFooter">
        <div className="taller">
          <h2>El Taller</h2>
          <p>
            Alonso - Servicio Integral Automotriz, te ofrece el mejor servicio
            de mecanica integral, inyeccion electronica, mecatronica, aire
            acondicionado y transmision. Al momento de necesitar un servicio
            mecanico no lo dudes!! contactanos!!
          </p>
        </div>
        <div className="social">
          <h2>Redes</h2>
          <button>
            <span>
              <Icon icon={faArrowRight} />
            </span>
            Instagram
          </button>
          <button>
            <span>
              <Icon icon={faArrowRight} />
            </span>
            Facebook
          </button>
        </div>
      </div>
      <span className="date">Todos los derechos reservados. {year} ©</span>
    </div>
  );
};

export default Footer;
