import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./LoginForm.css";

const LoginForm = ({ onSubmit, onChange, errors, user }) => (
    <React.Fragment>
        <form action="/" onSubmit={onSubmit}>
            <div className="section">
                {errors.summary && (
                    <p className="error-message">{errors.summary}</p>
                )}
                <div className={classnames("field", { error: !!errors.email })}>
                    <input
                        className="login-input-field"
                        type="text"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        placeholder="E-mail"
                    />
                    <span className="error-message">{errors.email}</span>
                </div>

                <div
                    className={classnames("field", {
                        error: !!errors.password,
                    })}
                >
                    <input
                        className="login-input-field"
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        placeholder="Password"
                    />
                    <span className="error-message">{errors.password}</span>
                </div>
            </div>
            <div className="buttons">
                <div className="button">
                    <Link to="/register">Register</Link>
                </div>
                <input type="submit" value="Login" />
            </div>
        </form>
    </React.Fragment>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default LoginForm;
