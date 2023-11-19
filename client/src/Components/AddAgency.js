import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAgency } from "../JS/actions/agency";

const AddAgency = ({ setAddAgency }) => {
  const [address, setAddress] = useState({
    state: "",
    city: "",
    postal_code: "",
    street: "",
  });
  const [agency, setAgency] = useState({
    agency_name: "",
    password: "",
    email: "",
    phone: +"",
    agency_description: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAgency(agency, address));
    setAgency({
      agency_name: "",
      password: "",
      email: "",
      phone: +"",
      agency_description: "",
    });
    setAddress({
      state: "",
      city: "",
      postal_code: "",
      street: "",
    });
    setAddAgency(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Agency Name
            <input
              type="text"
              name="agency_name"
              value={agency && agency.agency_name}
              onChange={(e) =>
                setAgency({ ...agency, [e.target.name]: e.target.value })
              }
            />
          </label>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={agency && agency.email}
              onChange={(e) =>
                setAgency({ ...agency, [e.target.name]: e.target.value })
              }
            />
          </label>
          <label>
            Agency description
            <input
              type="text"
              name="agency_description"
              value={agency && agency.agency_description}
              onChange={(e) =>
                setAgency({ ...agency, [e.target.name]: e.target.value })
              }
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={agency && agency.phone}
              onChange={(e) =>
                setAgency({ ...agency, [e.target.name]: e.target.value })
              }
            />
          </label>
          <div>
            <label>
              Agency address
              <div>
                <label>
                  State
                  <input
                    type="text"
                    name="state"
                    value={address && address.state}
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </label>
                <label>
                  City
                  <input
                    type="text"
                    name="city"
                    value={address && address.city}
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </label>
                <label>
                  Postal code
                  <input
                    type="text"
                    name="postal_code"
                    value={address && address.postal_code}
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </label>
                <label>
                  Street
                  <input
                    type="text"
                    name="street"
                    value={address && address.street}
                    onChange={(e) => {
                      setAddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </label>
              </div>
            </label>
          </div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={agency && agency.password}
              onChange={(e) =>
                setAgency({ ...agency, [e.target.name]: e.target.value })
              }
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAgency;
