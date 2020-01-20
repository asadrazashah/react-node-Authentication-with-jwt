import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { Redirect } from "react-router-dom";

class NavBar extends React.Component {
  state = {
    isOpen: false,
    redirect: false
  };
  // componentDidMount() {
  //   const jwt = localStorage.getItem("token");
  //   if (jwt) {
  //     this.setState({ logged: true });
  //   }
  // }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/signin">Sign In</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>

              <NavItem>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token");
                    // this.props.history.push("/signin");
                    this.setState({ redirect: true });
                    // alert("Logged out");
                  }}
                >
                  Log Out
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
