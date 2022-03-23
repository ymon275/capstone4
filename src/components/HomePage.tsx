import Sidebar from "./HomePage/Sidebar";
import Navbar from "./HomePage/Navbar";
import AboutMe from "./HomePage/AboutMe";
import Items from "./HomePage/Items";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <>
      <Navbar />
      <Container style={{width: "100%", height: "100%"}}>
        <Sidebar />
        <Row id="main">
          <Col xs={9}>
            <Items />
          </Col>
          <Col>
            <AboutMe />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
