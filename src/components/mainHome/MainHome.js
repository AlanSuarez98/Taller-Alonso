import Contact from "../contact/Contact";
import Footer from "../footer/Footer";
import ServiceList from "../serviceList/ServiceList";
import Welcome from "../welcome/Welcome";
import "./MainHome.css";

const MainHome = () => {
  return (
    <div className="mainHome">
      <Welcome />
      <ServiceList />
      <Contact />
      <Footer />
    </div>
  );
};

export default MainHome;
