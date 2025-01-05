import Header from "../../components/header/Header";
import MainHome from "../../components/mainHome/MainHome";
import Nav from "../../components/nav/Nav";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <Header />
      <MainHome />
    </div>
  );
};

export default Home;
