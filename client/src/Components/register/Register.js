import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../../JS/actions/user";

const Register = ({ toggle }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const errors = useSelector((state) => state.userReducer.errors);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(user, navigate));
    toggle();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Your Name"
          name="name"
          onInput={handleUser}
          value={user.name}
        />
        <input
          type="email"
          className="form-control"
          required
          placeholder="Your Email"
          name="email"
          onInput={handleUser}
          value={user.email}
        />
        <input
          type="password"
          required
          className="form-control"
          placeholder="Password"
          min={6}
          name="password"
          onInput={handleUser}
          value={user.password}
        />
        <input
          type="text"
          placeholder="Your phone number"
          name="phone"
          className="form-control"
          onInput={handleUser}
          value={user.phone}
        />
        <div className="form-group d-flex justify-content-center">
          <div className="form-check mr-3">
            <input
              value="business"
              type="radio"
              className="form-check-input"
              name="role"
              onInput={handleUser}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Business
            </label>
          </div>
          <div class="form-check">
            <input
              value="particular"
              type="radio"
              className="form-check-input"
              name="role"
              onInput={handleUser}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Particular
            </label>
          </div>
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  );
};

export default Register;
