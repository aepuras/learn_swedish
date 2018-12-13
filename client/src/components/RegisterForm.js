import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const RegisterForm = ({ onSubmit, onChange, errors, user }) => (
    <form action="/" onSubmit={onSubmit}>
        <h2>Register</h2>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className={classnames("field", { error: !!errors.email })}>
            <label htmlFor="email">E-mail</label>
            <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                onChange={onChange}
            />
            <span>{errors.email}</span>
        </div>

        <div className={classnames("field", { error: !!errors.password })}>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={onChange}
            />
            <span>{errors.password}</span>
        </div>

        <input type="submit" value="Create new account" />
    </form>
);

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default RegisterForm;
