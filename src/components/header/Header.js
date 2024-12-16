import "./Header.css";

const Header = () => {
    const car = "https://cdn.pixabay.com/photo/2015/10/01/19/05/car-967470_640.png";
  return (
    <div className="header">
        <div className="textHeader">
            <h2>Taller mecanico</h2>
            <h1>Alonso</h1>
        </div>
        <div className="carHeader">
            <img src={car} alt="Auto" />
        </div>
    </div>
  )
}

export default Header