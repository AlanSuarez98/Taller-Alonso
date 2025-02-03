import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/AuthContext";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toDate } from "date-fns-tz";
import "./Request.css";

const Request = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    patente: "",
    marca: "",
    modelo: "",
    año: "",
    color: "",
    kilometraje: "",
    tipoServicio: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const timeZone = "America/Argentina/Buenos_Aires";

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        nombre: user.nombre || "",
        email: user.email || "",
        patente: user.patente || "",
        marca: user.marca || "",
        modelo: user.modelo || "",
        año: user.año || "",
        color: user.color || "",
        kilometraje: user.kilometraje || "",
      }));
    }
  }, [isAuthenticated, user]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!isAuthenticated) {
        navigate("/iniciar-sesion");
        return;
      }

      if (!selectedDateTime) {
        showMessage(
          "Por favor selecciona una fecha y hora para el turno",
          "error"
        );
        return;
      }

      const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];
      const userAppointment = appointments.find(
        (apt) => apt.userId === user.email && apt.status === "En curso"
      );
      if (userAppointment) {
        showMessage(
          "Ya tienes un turno en curso. No puedes solicitar otro hasta que finalice.",
          "error"
        );
        return;
      }

      const utcDateTime = toDate(selectedDateTime, { timeZone });

      const isTimeSlotTaken = appointments.some((apt) => {
        const aptDate = new Date(apt.datetime);
        return aptDate.getTime() === utcDateTime.getTime();
      });

      if (isTimeSlotTaken) {
        showMessage(
          "Este horario ya no está disponible. Por favor selecciona otro.",
          "error"
        );
        return;
      }

      const newAppointment = {
        ...formData,
        datetime: utcDateTime.toISOString(),
        userId: user.email,
        status: "En curso",
      };
      appointments.push(newAppointment);
      localStorage.setItem("appointments", JSON.stringify(appointments));

      showMessage("Turno reservado exitosamente", "success");
      setTimeout(() => navigate("/mi-cuenta"), 2000);
    },
    [formData, selectedDateTime, isAuthenticated, navigate, user, timeZone]
  );

  return (
    <>
      <Nav />
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <div className="request">
        <h2>Turnos</h2>
        <div className="boxRequest">
          <div className="requestForm">
            <h3>Solicitar turno</h3>
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={handleInputChange}
                  required
                />
              ))}
              <DatePicker
                selected={selectedDateTime}
                onChange={(date) => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Hora"
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Selecciona fecha y hora"
                className="datepicker"
                minDate={new Date()}
                minTime={new Date(new Date().setHours(9, 0, 0))}
                maxTime={new Date(new Date().setHours(18, 0, 0))}
                required
              />
              <button type="submit">Solicitar turno</button>
            </form>
          </div>
          <div className="infoRequest">
            <h3>Información</h3>
            <p>
              Para solicitar un turno, completa el formulario con tus datos y
              selecciona una fecha y hora disponible.
            </p>
            <p>
              Una vez que hayas solicitado un turno, recibirás un email de
              confirmación.
            </p>
            <p>
              Si tienes un turno en curso, no podrás solicitar otro hasta que
              finalice.
            </p>
            <p>
              <strong>Horario de atención:</strong> Lunes a viernes de 9:00 hs a
              18:00 hs.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Request;
