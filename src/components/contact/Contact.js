import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Icon from "../icon/Icon";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contactanos</h2>
      <div className="boxContact">
        <div className="mapPreview">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.746283348528!2d-60.6719477237743!3d-32.957707372448226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab638e82cc03%3A0xf72dcecdb2ee81f2!2sAv.%20Francia%202155%2C%20S2003%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1734573333405!5m2!1ses!2sar"
            title="Ubicación en Google Maps"
            width="400"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="textContact">
          <p>
            Para brindarte un mejor servicio Alonso - Servicio Integral
            Automotriz pone a tu disposicion los distintos medios de
            comunicacion a fin de que puedas contactarnos lo antes posible.
          </p>
          <p className="span">ALONSO DÍAZ FERNANDO | 20-26000005-0 </p>
          <p>
            Gutenberg 1190 CP(2000) Rosario Argentina <br />
            <Icon icon={faWhatsapp} />
            <span> +54 9 3415600000</span> <br />
            E-mail : <span>alonso@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
