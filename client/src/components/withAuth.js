import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        redirect: false
      };
    }
    componentDidMount() {
      const jwt = localStorage.getItem("token");
      // console.log(jwt);
      axios
        .get("http://localhost:5000/checkToken", {
          headers: { Authorization: `${jwt}` }
        })
        .then(res => {
          if (res.status === 200) {
            // this.props.change();
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => this.setState({ redirect: true }));
    }

    render() {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to="/signin" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
