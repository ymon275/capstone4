import Sidebar from "./HomePage/Sidebar";
import Navbar from "./HomePage/Navbar";
import AboutMe from "./HomePage/AboutMe";
import Items from "./HomePage/Items";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <div className="mh-100 h-100">
      <Navbar />
        <Sidebar />
        <Container fluid id="main">
            <Items />
            <AboutMe />
        </Container>
    </div>
  );
}

export default Home;
