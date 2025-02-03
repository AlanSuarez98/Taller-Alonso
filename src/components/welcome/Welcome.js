import "./Welcome.css";

const Welcome = () => {
  const img1 =
    "https://wallpapers.com/images/hd/car-mechanic-maintenance-032p8vmzjfg1fq9t.jpg";
  return (
    <div className="welcome">
      <div className="imgWelcome">
        <img src={img1} alt="imagen 1" loading="lazy" />
      </div>
      <div className="textWelcome">
        <h2>
          Bienvenido a <span>Alonso</span>
        </h2>
        <h3>Servicio integral automotriz</h3>
        <p>
          Desde el año 2009 estamos dedicados al mantenimiento y reparacion
          mecanica de vehiculos, revisiones, mecanica integral, inyeccion
          electronica, aire acondicionado, mecatronica, venta y reparacion de
          turbo alimentadores y transmisiones.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
