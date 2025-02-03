import "./Dashboard.css";
import { useContext, useState, useEffect, useCallback } from "react";
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
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const usersData = JSON.parse(localStorage.getItem("users")) || [];

    const usersMap = usersData.reduce((acc, user) => {
      acc[user.email] = user;
      return acc;
    }, {});
    setUsers(usersMap);

    const sortedAppointments = appointments.sort((a, b) => {
      if (a.status === "En curso" && b.status !== "En curso") return -1;
      if (b.status === "En curso" && a.status !== "En curso") return 1;
      return new Date(b.datetime) - new Date(a.datetime);
    });

    setAllAppointments(sortedAppointments);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/iniciar-sesion");
  }, [logout, navigate]);

  const updateAppointmentStatus = useCallback(
    (appointmentId, status) => {
      const updatedAppointments = allAppointments.map((apt) =>
        apt.datetime === appointmentId ? { ...apt, status } : apt
      );
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      setAllAppointments(updatedAppointments);
    },
    [allAppointments]
  );

  const handleUploadInvoice = useCallback(
    (appointmentId, file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64PDF = reader.result.split(",")[1];
        const updatedAppointments = allAppointments.map((apt) =>
          apt.datetime === appointmentId ? { ...apt, invoice: base64PDF } : apt
        );
        localStorage.setItem(
          "appointments",
          JSON.stringify(updatedAppointments)
        );
        setAllAppointments(updatedAppointments);
      };
      reader.readAsDataURL(file);
    },
    [allAppointments]
  );

  return (
    <>
      <Nav />
      <div className="dashboard">
        <div className="userBoxDashboard">
          <h2 className="titleAdmin">
            Panel de Administración
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
                allAppointments.map((apt) => (
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
                          <strong>Servicio:</strong> {apt.tipoServicio}
                        </p>
                        <p>
                          <strong>Fecha:</strong>{" "}
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
                          <strong>Estado:</strong> {apt.status}
                        </p>
                        {apt.status === "En curso" && (
                          <>
                            <button
                              className="confirmBtn"
                              onClick={() =>
                                updateAppointmentStatus(
                                  apt.datetime,
                                  "Confirmado"
                                )
                              }
                            >
                              Confirmar turno
                            </button>
                            <button
                              className="cancelBtn"
                              onClick={() =>
                                updateAppointmentStatus(
                                  apt.datetime,
                                  "Cancelado"
                                )
                              }
                            >
                              Cancelar turno
                            </button>
                          </>
                        )}
                        {apt.status === "Confirmado" && (
                          <button
                            className="finalizeBtn"
                            onClick={() =>
                              updateAppointmentStatus(
                                apt.datetime,
                                "Finalizado"
                              )
                            }
                          >
                            Finalizar
                          </button>
                        )}
                        {apt.status === "Finalizado" && !apt.invoice && (
                          <input
                            className="uploadInvoice"
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                              handleUploadInvoice(
                                apt.datetime,
                                e.target.files[0]
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
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
