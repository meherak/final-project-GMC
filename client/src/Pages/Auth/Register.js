import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { register } from "../../JS/actions/user";
import "./Register.css";
import Notification from "../../Components/Notication";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: 0,
    role: "",
  });

  const errors = useSelector((state) => state.userReducer.errors);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(user, history));
  };

  return (
    <>
      {errors && errors.map((el) => <Notification error={el} />)}
      <form>
        <label>Name</label>
        <input
          type="text"
          placeholder="enter your name"
          required
          name="name"
          onInput={handleUser}
          value={user.name}
        />
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="enter your email"
          name="email"
          onInput={handleUser}
          value={user.email}
        />
        <label>Password</label>
        <input
          type="password"
          required
          placeholder="enter your password"
          min={6}
          name="password"
          onInput={handleUser}
          value={user.password}
        />
        <label>Phone</label>
        <input
          type="number"
          placeholder="enter your phone number"
          name="phone"
          onInput={handleUser}
          value={user.phone}
        />
        <label>
          Particular
          <input
            value="particular"
            type="radio"
            name="role"
            onInput={handleUser}
          />
        </label>
        <label>
          Business
          <input
            value="business"
            type="radio"
            name="role"
            onInput={handleUser}
          />
        </label>
        <input type="submit" onClick={handleRegister} />
      </form>
    </>
  );
};

export default Register;
