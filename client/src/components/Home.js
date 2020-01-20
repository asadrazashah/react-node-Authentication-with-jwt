import React from "react";
import { Container } from "reactstrap";
import Navbar from "./Navbar";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: "50px" }}>
          <Container>
            <h3 className="text-center">Welcome to Home</h3>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
