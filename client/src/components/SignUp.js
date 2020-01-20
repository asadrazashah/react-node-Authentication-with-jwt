import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";

class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    redirect: false
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
    if (this.state.password !== this.state.confirmPassword) {
      alert("Password does not match");
      return;
    }
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:5000/api/user/signup", user)
      .then(res => {
        if (res.status === 200) {
          // this.setState({ redirect: true });
          this.props.history.push("/signin");
        }
      })
      .catch(err => alert(err));
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: "50px" }}>
          <Container>
            <Row>
              <Col md="3" lg="3" sm="1" xs="1"></Col>
              <Col md="5" lg="5" sm="10" xs="10">
                <div className="shadow p-3">
                  <Form onSubmit={this.submit}>
                    <FormGroup>
                      <Label for="Name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
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
                    <FormGroup>
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
                    <FormGroup>
                      <Label for="confirmPassword"> Confirm Password</Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        placeholder="****"
                        required
                      />
                    </FormGroup>

                    <Button color="success" block>
                      Sign Up{" "}
                    </Button>
                    <a href="/signin" style={{ marginTop: "10px" }}>
                      Already have an account ? Click Here
                    </a>
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

// const mapStateToProps = state => {
//   return {
//     status: state.status
//   };
// };
// const mapDispatchToProps = {
//   addUser: addUser
// };

// const Register = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignUp);

export default SignUp;
