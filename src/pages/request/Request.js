import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/AuthContext";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import "./Request.css";

const Request = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [carDatabase, setCarDatabase] = useState([]);
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
    IMAGEN: "",
  });

  // Cargar datos del Excel usando FileReader
  const loadExcelData = useCallback(async () => {
    try {
      const response = await fetch("/car-database.xlsx"); // Asegúrate de que el archivo esté en la carpeta public
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setCarDatabase(jsonData);
      };

      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error("Error loading Excel data:", error);
    }
  }, []);

  useEffect(() => {
    loadExcelData();
  }, [loadExcelData]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        nombre: user.nombre || "",
        email: user.email || "",
        patente: user.patente || "",
      }));
    }
  }, [isAuthenticated, user]);

  const findCarImage = useCallback(
    (marca, modelo, color) => {
      if (!marca || !modelo || !color || !carDatabase.length) return null;

      const car = carDatabase.find(
        (car) =>
          car.marca?.toString().toLowerCase() === marca.toLowerCase() &&
          car.modelo?.toString().toLowerCase() === modelo.toLowerCase() &&
          car.COLOR?.toString().toLowerCase() === color.toLowerCase()
      );

      return car?.IMAGEN || null;
    },
    [carDatabase]
  );

  useEffect(() => {
    const image = findCarImage(formData.marca, formData.modelo, formData.color);
    if (image) {
      setFormData((prev) => ({ ...prev, IMAGEN: image }));
    }
  }, [formData.marca, formData.modelo, formData.color, findCarImage]);

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
        alert("Por favor selecciona una fecha y hora para el turno");
        return;
      }

      const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

      // Convertir las fechas a la misma zona horaria para comparar
      const selectedTime = new Date(selectedDateTime).getTime();

      const isTimeSlotTaken = appointments.some((apt) => {
        const aptTime = new Date(apt.datetime).getTime();
        return aptTime === selectedTime;
      });

      if (isTimeSlotTaken) {
        alert("Este horario ya no está disponible. Por favor selecciona otro.");
        return;
      }

      const newAppointment = {
        ...formData,
        datetime: selectedDateTime.toISOString(),
        userId: user.email,
      };

      appointments.push(newAppointment);
      localStorage.setItem("appointments", JSON.stringify(appointments));

      alert("Turno reservado exitosamente");
      navigate("/mi-cuenta");
    },
    [formData, selectedDateTime, isAuthenticated, navigate, user]
  );

  const filterAvailableTimes = useCallback((time) => {
    const timeToCheck = time instanceof Date ? time : new Date(time);

    // Verificar si es hora de trabajo (9:00 - 17:30)
    const hours = timeToCheck.getHours();
    const minutes = timeToCheck.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    if (timeInMinutes < 9 * 60 || timeInMinutes > 17 * 60 + 30) {
      return false;
    }

    // Verificar si el horario ya está ocupado
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    return !appointments.some((apt) => {
      const aptDate = new Date(apt.datetime);
      return aptDate.getTime() === timeToCheck.getTime();
    });
  }, []);

  const filterDate = useCallback((date) => {
    // Excluir sábados (6) y domingos (0)
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }, []);

  // Generar horarios disponibles
  const excludeTimes = useMemo(() => {
    const excluded = [];
    const current = new Date();
    current.setHours(9, 0, 0, 0);
    const end = new Date();
    end.setHours(17, 30, 0, 0);

    while (current <= end) {
      const currentCopy = new Date(current); // Crea una copia para evitar problemas
      if (!filterAvailableTimes(currentCopy)) {
        excluded.push(currentCopy);
      }
      current.setMinutes(current.getMinutes() + 30);
    }
    return excluded;
  }, [filterAvailableTimes]);

  const getModelClass = useCallback(() => {
    const year = parseInt(formData.año);
    return year >= 2015 ? "newModel" : "oldModel";
  }, [formData.año]);

  const PreviewSection = useMemo(
    () => (
      <div className="requestInfo">
        <h3>Vista previa</h3>
        <div
          className="boxImg"
          style={{
            backgroundImage: formData.IMAGEN
              ? `url(${formData.IMAGEN})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "200px",
          }}
        />
        <div className="infoCar">
          <h4>
            <span>Marca:</span> {formData.marca}
          </h4>
          <h4>
            <span>Modelo:</span> {formData.modelo}
          </h4>
          <h4>
            <span>Año:</span> {formData.año}
          </h4>
          <h4>
            <span>Color:</span> {formData.color}
          </h4>
          <h4>
            <span>Kilometraje:</span> {formData.kilometraje}
          </h4>
          <h4>
            <span>Tipo de servicio:</span> {formData.tipoServicio}
          </h4>
          <h4>
            <span>Patente:</span>
            <div className={getModelClass()}>{formData.patente}</div>
          </h4>
        </div>
      </div>
    ),
    [formData, getModelClass]
  );

  return (
    <>
      <Nav />
      <div className="request">
        <h2>Turnos</h2>
        <div className="boxRequest">
          <div className="requestForm">
            <h3>Solicitar turno</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="patente"
                placeholder="Dominio del auto"
                value={formData.patente}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="marca"
                placeholder="Marca"
                value={formData.marca}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="modelo"
                placeholder="Modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="año"
                placeholder="Año"
                value={formData.año}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="kilometraje"
                placeholder="Kilometraje"
                value={formData.kilometraje}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="tipoServicio"
                placeholder="Tipo de servicio"
                value={formData.tipoServicio}
                onChange={handleInputChange}
                required
              />

              <DatePicker
                selected={selectedDateTime}
                onChange={(date) => setSelectedDateTime(date)} // No ajustes manualmente aquí
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Hora"
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Selecciona fecha y hora"
                className="datepicker"
                minDate={new Date()}
                minTime={new Date().setHours(9, 0)}
                maxTime={new Date().setHours(17, 30)}
                filterDate={filterDate}
                filterTime={filterAvailableTimes}
                excludeTimes={excludeTimes}
                required
              />

              <button type="submit">Solicitar turno</button>
            </form>
          </div>
          {PreviewSection}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Request;
