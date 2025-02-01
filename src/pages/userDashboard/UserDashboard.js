import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../service/AuthContext";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];
      const userAppointments = appointments.filter(
        (apt) => apt.userId === user.email
      );

      // Ordenar los turnos
      userAppointments.sort((a, b) => {
        // Primero, ordenar por estado: "En curso" primero
        if (a.status === "En curso" && b.status !== "En curso") return -1;
        if (b.status === "En curso" && a.status !== "En curso") return 1;

        // Luego, ordenar por fecha y hora: de más reciente a más antiguo
        return new Date(b.datetime) - new Date(a.datetime);
      });

      setUserAppointments(userAppointments);
    }
  }, [isAuthenticated, user]);

  // Si no hay usuario autenticado, no renderizar nada
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleCancelAppointment = (appointmentId) => {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAppointments = appointments.map((apt) => {
      if (apt.datetime === appointmentId) {
        return { ...apt, status: "Cancelado" };
      }
      return apt;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setUserAppointments(
      updatedAppointments.filter((apt) => apt.userId === user.email)
    );
  };

  const handleDownloadInvoice = (base64PDF, invoiceName = "factura.pdf") => {
    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64PDF}`;
    link.download = invoiceName;
    link.click();
  };

  const handleLogout = () => {
    logout();
    navigate("/iniciar-sesion");
  };

  return (
    <>
      <Nav />
      <div className="userDashboard">
        <div className="userBoxDashboard">
          <h2>
            Mi cuenta{" "}
            <button className="logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </h2>
          <div className="infoUser">
            <p>Nombre: {user.nombre}</p>
            <p>Email: {user.email}</p>
            <p>Marca: {user.marca}</p>
            <p>Modelo: {user.modelo}</p>
            <p>Año: {user.año}</p>
            <p>Color: {user.color}</p>
            <p>Kilometraje: {user.kilometraje}</p>
            <p>Patente: {user.patente}</p>
          </div>
          <div className="requestUser">
            <h3>Turnos solicitados</h3>
            <div className="boxRequestUser">
              {userAppointments.length > 0 ? (
                userAppointments.map((apt) => (
                  <div className="requestUserForm" key={apt.datetime}>
                    <p>
                      <strong>Servicio</strong> <br />
                      {apt.tipoServicio}
                    </p>
                    <p>
                      <strong>Fecha</strong> <br />{" "}
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
                      <strong>Estado</strong> <br />
                      {apt.status}
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
