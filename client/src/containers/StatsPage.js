import React from "react";
import axios from "axios-es6";
import { Redirect } from "react-router-dom";
import Splash from "../components/Splash";
import Stats from "../components/Stats";
import Auth from "../modules/Auth";

class StatsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            loading: false,
            authorized: true,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    getAuthHeaders() {
        const config = {
            headers: {
                Authorization: "bearer " + Auth.getToken(),
            },
        };
        return config;
    }

    loadData() {
        this.setState({ loading: true });
        axios
            .get("/api/stats", this.getAuthHeaders())
            .then(response => {
                this.setState({
                    stats: response.data.items,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    authorized: error.status !== 401,
                    loading: false,
                });
            });
    }

    printAuthorized() {
        return this.state.loading ? (
            <Splash />
        ) : (
            <Stats stats={this.state.stats} />
        );
    }

    render() {
        return this.state.authorized ? (
            this.printAuthorized()
        ) : (
            <Redirect to="/login" />
        );
    }
}

export default StatsPage;
