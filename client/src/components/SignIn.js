import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  UncontrolledAlert
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    error: false
  };
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      this.setState({ redirect: true });
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:5000/api/user/signin", user)
      .then(res => {
        if (res.status === 200) {
          // this.setState({ redirect: true });
          // console.log(res);

          localStorage.setItem("token", res.data);
          this.props.history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => this.setState({ error: true }));
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: "100px" }}>
          <Container>
            <Row>
              <Col md="3" lg="3" sm="1" xs="1"></Col>
              <Col md="5" lg="5" sm="10" xs="10">
                {this.state.error && (
                  <UncontrolledAlert color="info">
                    Wrong credentials.Try again
                  </UncontrolledAlert>
                )}
                <div className="shadow p-4">
                  <Form onSubmit={this.submit}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="****"
                        required
                      />
                    </FormGroup>
                    <Button className="mt-2" color="success" block>
                      Sign In{" "}
                    </Button>
                    <a href="/signup">Create an account</a>
                  </Form>
                </div>
              </Col>
              <Col md="4" lg="4" sm="1" xs="1"></Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default SignIn;
