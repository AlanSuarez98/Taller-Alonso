import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../service/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const filteredAppointments = appointments.filter(
      (apt) => apt.userId === user.email
    );

    filteredAppointments.sort((a, b) => {
      if (a.status === "En curso" && b.status !== "En curso") return -1;
      if (b.status === "En curso" && a.status !== "En curso") return 1;
      return new Date(b.datetime) - new Date(a.datetime);
    });

    setUserAppointments(filteredAppointments);
  }, [isAuthenticated, user]);

  const handleCancelAppointment = useCallback(
    (appointmentId) => {
      const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];
      const updatedAppointments = appointments.map((apt) =>
        apt.datetime === appointmentId ? { ...apt, status: "Cancelado" } : apt
      );

      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      setUserAppointments(
        updatedAppointments.filter((apt) => apt.userId === user.email)
      );
    },
    [user]
  );

  const handleDownloadInvoice = (base64PDF, invoiceName = "factura.pdf") => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64PDF}`;
    link.download = invoiceName;
    link.click();
  };

  const handleLogout = () => {
    logout();
    navigate("/iniciar-sesion");
  };

  if (!isAuthenticated || !user) return null;

  return (
    <>
      <Nav />
      <div className="userDashboard">
        <div className="userBoxDashboard">
          <h2>
            Mi cuenta
            <button className="logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </h2>
          <div className="infoUser">
            {[
              "nombre",
              "email",
              "marca",
              "modelo",
              "año",
              "color",
              "kilometraje",
              "patente",
            ].map((attr) => (
              <p key={attr}>
                <strong>{attr.charAt(0).toUpperCase() + attr.slice(1)}:</strong>{" "}
                {user[attr]}
              </p>
            ))}
          </div>
          <div className="requestUser">
            <h3>Turnos solicitados</h3>
            <div className="boxRequestUser">
              {userAppointments.length ? (
                userAppointments.map((apt) => (
                  <div className="requestUserForm" key={apt.datetime}>
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
                      <button
                        onClick={() => handleCancelAppointment(apt.datetime)}
                      >
                        Cancelar turno
                      </button>
                    )}
                    {apt.status === "Finalizado" && apt.invoice && (
                      <button
                        onClick={() =>
                          handleDownloadInvoice(
                            apt.invoice,
                            `factura_${apt.datetime}.pdf`
                          )
                        }
                      >
                        Descargar Factura
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No tiene ningún turno</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
