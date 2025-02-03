import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/AuthContext";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import "./Login.css";

const INITIAL_LOGIN_DATA = { email: "", password: "" };
const INITIAL_REGISTER_DATA = {
  nombre: "",
  email: "",
  password: "",
  patente: "",
  marca: "",
  modelo: "",
  año: "",
  color: "",
  kilometraje: "",
};
const ADMIN_CREDENTIALS = {
  email: "adminalonso@hotmail.com",
  password: "alonsoadmin123",
};

const Login = () => {
  const { login, isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(INITIAL_LOGIN_DATA);
  const [registerData, setRegisterData] = useState(INITIAL_REGISTER_DATA);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.isAdmin ? "/administracion" : "/mi-cuenta");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (Object.values(registerData).some((value) => !value)) {
      setMessage({ text: "Todos los campos son obligatorios.", type: "error" });
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === registerData.email)) {
      setMessage({ text: "El email ya está registrado.", type: "error" });
      return;
    }
    users.push(registerData);
    localStorage.setItem("users", JSON.stringify(users));
    setMessage({
      text: "Registro exitoso. Ahora puedes iniciar sesión.",
      type: "success",
    });
    setRegisterData(INITIAL_REGISTER_DATA);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setMessage({
        text: "Por favor, completa todos los campos.",
        type: "error",
      });
      return;
    }
    if (
      loginData.email === ADMIN_CREDENTIALS.email &&
      loginData.password === ADMIN_CREDENTIALS.password
    ) {
      navigate(login({ email: loginData.email, nombre: "Admin" }));
      setMessage({ text: "Inicio de sesión exitoso.", type: "success" });
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );
    user
      ? navigate(login(user))
      : setMessage({ text: "Email o contraseña incorrectos.", type: "error" });
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
                name="email"
                placeholder="Email"
                className="flip-card__input"
                onChange={handleInputChange(setLoginData)}
                value={loginData.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="flip-card__input"
                onChange={handleInputChange(setLoginData)}
                value={loginData.password}
              />
              <button className="flip-card__btn">Entrar</button>
            </form>
          </div>
          <div className="flip-card__back">
            <div className="title">Registrarme</div>
            <form className="flip-card__form" onSubmit={handleRegister}>
              {Object.keys(INITIAL_REGISTER_DATA).map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="flip-card__input"
                  onChange={handleInputChange(setRegisterData)}
                  value={registerData[field]}
                />
              ))}
              <button className="flip-card__btn">Registrarme</button>
            </form>
          </div>
        </div>
        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
