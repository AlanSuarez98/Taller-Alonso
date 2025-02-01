import "./Dashboard.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../service/AuthContext";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import "../userDashboard/UserDashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [allAppointments, setAllAppointments] = useState([]);
  // eslint-disable-next-line
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Cargar todos los turnos
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    // Cargar todos los usuarios para obtener sus datos
    const usersData = JSON.parse(localStorage.getItem("users")) || [];

    // Crear un objeto para acceso rápido a los datos de usuarios
    const usersMap = {};
    usersData.forEach((user) => {
      usersMap[user.email] = user;
    });

    setUsers(usersMap);

    // Ordenar turnos
    const sortedAppointments = appointments.sort((a, b) => {
      // Primero, ordenar por estado: "En curso" primero
      if (a.status === "En curso" && b.status !== "En curso") return -1;
      if (b.status === "En curso" && a.status !== "En curso") return 1;

      // Luego, ordenar por fecha y hora: de más reciente a más antiguo
      return new Date(b.datetime) - new Date(a.datetime);
    });

    setAllAppointments(sortedAppointments);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/iniciar-sesion");
  };

  const handleCancelAppointment = (appointmentId) => {
    const updatedAppointments = allAppointments.map((apt) => {
      if (apt.datetime === appointmentId) {
        return { ...apt, status: "Cancelado" };
      }
      return apt;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAllAppointments(updatedAppointments);
  };

  const handleConfirmAppointment = (appointmentId) => {
    const updatedAppointments = allAppointments.map((apt) => {
      if (apt.datetime === appointmentId) {
        return { ...apt, status: "Confirmado" };
      }
      return apt;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAllAppointments(updatedAppointments);
  };

  const handleFinalizeAppointment = (appointmentId) => {
    const updatedAppointments = allAppointments.map((apt) => {
      if (apt.datetime === appointmentId) {
        return { ...apt, status: "Finalizado" };
      }
      return apt;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAllAppointments(updatedAppointments);
  };

  const handleUploadInvoice = (appointmentId, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64PDF = reader.result.split(",")[1]; // Obtener solo la parte Base64

      const updatedAppointments = allAppointments.map((apt) => {
        if (apt.datetime === appointmentId) {
          return { ...apt, invoice: base64PDF }; // Guardar el archivo en Base64
        }
        return apt;
      });

      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      setAllAppointments(updatedAppointments);
    };
    reader.readAsDataURL(file); // Leer el archivo como Base64
  };

  return (
    <>
      <Nav />
      <div className="dashboard">
        <div className="userBoxDashboard">
          <h2 className="titleAdmin">
            Panel de Administración{" "}
            <button className="logoutAdmin" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </h2>
          <div className="infoUser">
            <p>Nombre: Admin</p>
            <p>Email: {user.email}</p>
          </div>
          <div className="requestUserShifts">
            <h3>Todos los turnos</h3>
            <div className="boxRequestShift">
              {allAppointments.length > 0 ? (
                allAppointments.map((apt) => {
                  return (
                    <div className="requestUserFormShifts" key={apt.datetime}>
                      <div className="appointmentInfo">
                        <h4>Datos del Cliente</h4>
                        <div className="customerInfo">
                          <p>
                            <strong>Nombre:</strong> {apt.nombre}
                          </p>
                          <p>
                            <strong>Email:</strong> {apt.email}
                          </p>
                        </div>
                        <h4>Datos del Vehículo</h4>
                        <div className="carInfo">
                          <p>
                            <strong>Marca:</strong> {apt.marca}
                          </p>
                          <p>
                            <strong>Modelo:</strong> {apt.modelo}
                          </p>
                          <p>
                            <strong>Año:</strong> {apt.año}
                          </p>
                          <p>
                            <strong>Color:</strong> {apt.color}
                          </p>
                          <p>
                            <strong>Patente:</strong> {apt.patente}
                          </p>
                          <p>
                            <strong>Kilometraje:</strong> {apt.kilometraje} km
                          </p>
                        </div>
                        <h4>Datos del Turno</h4>
                        <div className="shiftInfo">
                          <p>
                            <strong>Servicio:</strong> <br />
                            {apt.tipoServicio}
                          </p>
                          <p>
                            <strong>Fecha:</strong> <br />
                            {new Date(apt.datetime).toLocaleString("es-AR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </p>
                          <p>
                            <strong>Estado:</strong> <br />
                            {apt.status}
                          </p>

                          {apt.status === "En curso" && (
                            <div className="appointmentActions">
                              <button
                                className="confirmBtn"
                                onClick={() =>
                                  handleConfirmAppointment(apt.datetime)
                                }
                              >
                                Confirmar turno
                              </button>
                              <button
                                className="cancelBtn"
                                onClick={() =>
                                  handleCancelAppointment(apt.datetime)
                                }
                              >
                                Cancelar turno
                              </button>
                            </div>
                          )}

                          {apt.status === "Confirmado" && (
                            <div className="appointmentActions">
                              <button
                                className="finalizeBtn"
                                onClick={() =>
                                  handleFinalizeAppointment(apt.datetime)
                                }
                              >
                                Finalizar
                              </button>
                            </div>
                          )}

                          {apt.status === "Finalizado" && !apt.invoice && (
                            <div className="appointmentActions">
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) =>
                                  handleUploadInvoice(
                                    apt.datetime,
                                    e.target.files[0]
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No hay turnos registrados</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
