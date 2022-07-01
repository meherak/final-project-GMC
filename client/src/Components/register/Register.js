import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { AUTH_TOKEN } from "../../constants";

const SING_UP = gql`
  mutation singUp(
    $email: String
    $name: String
    $password: String
    $phone: Float
    $role: UserRole
  ) {
    singUp(
      email: $email
      name: $name
      password: $password
      phone: $phone
      role: $role
    ) {
      token
      user {
        name
        email
        role
      }
    }
  }
`;

const Register = ({ toggle }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const [singUp] = useMutation(SING_UP, {
    variables: {
      ...user,
      phone: +user.phone,
    },
    onCompleted: ({ singUp }) => {
      const { token } = singUp;
      localStorage.setItem(AUTH_TOKEN, token);
    },
  });

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
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
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          singUp();
          toggle();
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
