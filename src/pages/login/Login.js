import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/AuthContext";
import "./Login.css";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";

const Login = () => {
  const { login, isAuthenticated, user } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    patente: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirigir antes de renderizar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.isAdmin) {
        navigate("/administracion");
      } else {
        navigate("/mi-cuenta");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { nombre, email, password, patente } = formData;

    if (!nombre || !email || !password || !patente) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      setError("El email ya está registrado.");
      return;
    }

    const newUser = { nombre, email, password, patente };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    setFormData({ nombre: "", email: "", password: "", patente: "" });
    setIsLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const adminCredentials = {
      email: "adminalonso@hotmail.com",
      password: "alonsoadmin123",
    };

    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      login({ email, nombre: "Admin" });
      setError("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user);
      setError("");
    } else {
      setError("Email o contraseña incorrectos.");
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ nombre: "", email: "", password: "", patente: "" });
  };

  return (
    <>
      <Nav />
      <div className="login">
        <div className="wrapper">
          <div className="card-switch">
            <label className="switch">
              <input className="toggle" type="checkbox" onChange={toggleView} />
              <span className="slider"></span>
              <span className="card-side"></span>
              <div className="flip-card__inner">
                <div className="flip-card__front">
                  <div className="title">Iniciar Sesión</div>
                  <form className="flip-card__form" onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="flip-card__input"
                      onChange={handleInputChange}
                      value={formData.email}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="flip-card__input"
                      onChange={handleInputChange}
                      value={formData.password}
                    />
                    <button className="flip-card__btn">Entrar</button>
                  </form>
                </div>
                <div className="flip-card__back">
                  <div className="title">Registrarme</div>
                  <form className="flip-card__form" onSubmit={handleRegister}>
                    <input
                      type="text"
                      placeholder="Name"
                      name="nombre"
                      className="flip-card__input"
                      onChange={handleInputChange}
                      value={formData.nombre}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="flip-card__input"
                      onChange={handleInputChange}
                      value={formData.email}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="flip-card__input"
                      onChange={handleInputChange}
                      value={formData.password}
                    />
                    <input
                      type="text"
                      placeholder="Dominio del auto (Ej. AA 000 BB)"
                      name="patente"
                      className="flip-card__input"
                      onChange={handleInputChange}
                      value={formData.patente}
                    />
                    <button className="flip-card__btn">Registrarme</button>
                  </form>
                </div>
              </div>
            </label>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <Footer />
    </>
  );
};

export default Login;
