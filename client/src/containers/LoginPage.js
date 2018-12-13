import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios-es6';
import LoginForm from '../components/LoginForm';
import Splash from '../components/Splash';
import Auth from '../modules/Auth';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            },
            submitted: false,
            loading: false
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user
        });
    }

    processForm(event) {
        event.preventDefault();

        this.setState({ loading: true });
        axios
            .post('/auth/login', this.state.user)
            .then(
                function(response) {
                    Auth.authenticateUser(response.data.token);
                    this.setState({
                        errors: {},
                        submitted: true,
                        loading: false
                    });
                }.bind(this)
            )
            .catch(
                function(response) {
                    const errors = response.data.errors
                        ? response.data.errors
                        : {};
                    errors.summary = response.data.message;
                    this.setState({
                        errors: errors,
                        loading: false
                    });
                }.bind(this)
            );
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                {this.state.loading && <Splash />}
                <LoginForm
                    onSubmit={this.processForm}
                    onChange={this.changeUser}
                    errors={this.state.errors}
                    user={this.state.user}
                />
            </div>
        );
    }
}

export default LoginPage;
