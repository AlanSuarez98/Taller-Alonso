import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/AuthContext";
import "./Login.css";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";

const Login = () => {
  const { login, isAuthenticated, user } = useContext(AuthContext);
  // eslint-disable-next-line
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    password: "",
    patente: "",
    marca: "",
    modelo: "",
    año: "",
    color: "",
    kilometraje: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.isAdmin) {
        navigate("/administracion");
      } else {
        navigate("/mi-cuenta");
      }
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const {
      nombre,
      email,
      password,
      patente,
      marca,
      modelo,
      año,
      color,
      kilometraje,
    } = registerData;

    if (
      !nombre ||
      !email ||
      !password ||
      !patente ||
      !marca ||
      !modelo ||
      !año ||
      !color ||
      !kilometraje
    ) {
      setMessage({ text: "Todos los campos son obligatorios.", type: "error" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      setMessage({ text: "El email ya está registrado.", type: "error" });
      return;
    }

    users.push({
      nombre,
      email,
      password,
      patente,
      marca,
      modelo,
      año,
      color,
      kilometraje,
    });
    localStorage.setItem("users", JSON.stringify(users));

    setMessage({
      text: "Registro exitoso. Ahora puedes iniciar sesión.",
      type: "success",
    });
    setRegisterData({
      nombre: "",
      email: "",
      password: "",
      patente: "",
      marca: "",
      modelo: "",
      año: "",
      color: "",
      kilometraje: "",
    });
    setIsLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      setMessage({
        text: "Por favor, completa todos los campos.",
        type: "error",
      });
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
      const redirectPath = login({ email, nombre: "Admin" });
      navigate(redirectPath);
      setMessage({ text: "Inicio de sesión exitoso.", type: "success" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const redirectPath = login(user);
      navigate(redirectPath);
      setMessage({ text: "Inicio de sesión exitoso.", type: "success" });
    } else {
      setMessage({ text: "Email o contraseña incorrectos.", type: "error" });
    }
  };

  return (
    <>
      <Nav />
      <div className="login">
        <div className="wrapper">
          <div className="flip-card__front">
            <div className="title">Iniciar Sesión</div>
            <form className="flip-card__form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="flip-card__input"
                onChange={handleLoginInputChange}
                value={loginData.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="flip-card__input"
                onChange={handleLoginInputChange}
                value={loginData.password}
              />
              <button className="flip-card__btn">Entrar</button>
            </form>
          </div>
          <div className="flip-card__back">
            <div className="title">Registrarme</div>
            <form className="flip-card__form" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.nombre}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.password}
              />
              <label>Datos del vehículo</label>
              <input
                type="text"
                placeholder="Marca"
                name="marca"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.marca}
              />
              <input
                type="text"
                placeholder="Modelo"
                name="modelo"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.modelo}
              />
              <input
                type="text"
                placeholder="Año"
                name="año"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.año}
              />
              <input
                type="text"
                placeholder="Color"
                name="color"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.color}
              />
              <input
                type="text"
                placeholder="Kilometraje"
                name="kilometraje"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.kilometraje}
              />
              <input
                type="text"
                placeholder="Dominio del auto (Ej. AA 000 BB)"
                name="patente"
                className="flip-card__input"
                onChange={handleRegisterInputChange}
                value={registerData.patente}
              />
              <button className="flip-card__btn">Registrarme</button>
            </form>
          </div>
        </div>
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
