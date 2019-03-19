// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";
import ReCaptchaV3 from "../components/Recaptcha3/ReCaptcha";
import {loadReCaptcha} from "../components/Recaptcha3/loadReCaptcha";

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}

const verifyCallback = (recaptchaToken) => {
  // Here you will get the final recaptchaToken!!!  
  console.log(recaptchaToken, "<= your recaptcha token")
};

class ConnectedForm extends Component {
  constructor() {
    super();

    this.state = {
      title: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  componentDidMount() {
    loadReCaptcha("6LdZxpcUAAAAAPRRAJpfmFOzfLWHre-iXkU-5nmJ");
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
        <ReCaptchaV3
            sitekey="6LdZxpcUAAAAAPRRAJpfmFOzfLWHre-iXkU-5nmJ"
            action='action_name'
            verifyCallback={verifyCallback}
        />
      </form>
    );
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;