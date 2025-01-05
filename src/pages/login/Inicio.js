<div className="wrapper">
  <div className="card-switch">
    <label className="switch">
      <input className="toggle" type="checkbox" />
      <span className="slider"></span>
      <span className="card-side"></span>
      <div className="flip-card__inner">
        <div className="flip-card__front">
          <div className="title">Iniciar Sesión</div>
          <form className="flip-card__form">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="flip-card__input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="flip-card__input"
            />
            <button className="flip-card__btn">Entrar</button>
          </form>
        </div>
        <div className="flip-card__back">
          <div className="title">Registrarme</div>
          <form className="flip-card__form">
            <input
              type="text"
              placeholder="Name"
              className="flip-card__input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="flip-card__input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="flip-card__input"
            />
            <input
              type="text"
              placeholder="Dominio del auto (Ej. AA 000 BB)"
              className="flip-card__input"
            />
            <button className="flip-card__btn">Registrarme</button>
          </form>
        </div>
      </div>
    </label>
  </div>
</div>;
