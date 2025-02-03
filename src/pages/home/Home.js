import Header from "../../components/header/Header";
import MainHome from "../../components/mainHome/MainHome";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <Header />
      <MainHome />
      <Footer />
    </div>
  );
};

export default Home;
