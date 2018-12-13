import React, { Component } from "react";
import RegisterForm from "../components/RegisterForm";
import Splash from "../components/Splash";
import axios from "axios-es6";

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            user: {
                email: "",
                password: "",
            },
            loading: false,
            successMessage: "",
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user,
        });
    }

    processForm(event) {
        event.preventDefault();

        axios
            .post("/auth/signup", this.state.user)
            .then(
                function() {
                    this.setState({
                        errors: {},
                        loading: false,
                        successMessage: "Account created!",
                        user: {
                            email: "",
                            password: "",
                        },
                    });
                }.bind(this)
            )
            .catch(
                function(response) {
                    const errors = response.data.errors;
                    errors.summary = response.data.message;
                    this.setState({
                        errors: errors,
                        loading: false,
                        successMessage: "",
                    });
                }.bind(this)
            );
    }

    render() {
        return (
            <div>
                {this.state.loading && <Splash />}
                {this.state.successMessage.length > 0 && (
                    <div className="success">{this.state.successMessage}</div>
                )}
                <RegisterForm
                    onSubmit={this.processForm}
                    onChange={this.changeUser}
                    errors={this.state.errors}
                    user={this.state.user}
                />
            </div>
        );
    }
}

export default RegisterPage;
