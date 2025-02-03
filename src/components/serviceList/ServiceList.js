import "./ServiceList.css";

const ServiceList = () => {
  const service1 = "https://olivieri.com.ar/images/s2.jpg";
  const service2 = "https://olivieri.com.ar/images/s3.jpg";
  const service3 = "https://olivieri.com.ar/images/s1.jpg";
  return (
    <div className="serviceList">
      <h2 className="titleService">Servicios</h2>
      <div className="boxService">
        <div className="cardService">
          <img src={service1} alt="Mecanica Integral" loading="lazy" />
          <h2>Mecanica Integral</h2>
          <p>
            Transmision, tren delantero y frenos, suspension, aire
            acondicionado, direccion hidraulica, alineacion y balanceo, venta y
            reparacion de turbo alimentadores.
          </p>
        </div>
        <div className="cardService">
          <img src={service2} alt="Electronica y Electricidad" loading="lazy" />
          <h2>Electronica y Electricidad</h2>
          <p>
            Mecatronica, Electronica de motor, de confort y de seguridad (abs,
            airbag y esp).
          </p>
        </div>
        <div className="cardService">
          <img src={service3} alt="Mecatronica" loading="lazy" />
          <h2>Mecatronica</h2>
          <p>
            Mecatronica es la integracion de mecanica, electronica y software
            para crear ahorros de energia y de recursos y sistemas de alta
            inteligencia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
