import React, { useState, useEffect } from "react";
import User from "../components/User";
import useClient from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminPanel() {
  let [all_users, set_all_users] = useState([]);
  let id = 0;
  const client = useClient();
  const username = useSelector((state) => state.username.username);
  const isAdmin = useSelector((state) => state.isAdmin.isAdmin);
  let [isAuthenticated, setIsAuthenticated] = useState(username !== "");
  const navigate = useNavigate();
  useEffect(() => {
    setIsAuthenticated(username !== "");
  }, [username]);

  const fetch_all_users = () => {
    client
      .get("get-all-users")
      .then((data) => {
        set_all_users(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function verifyIsAdmin() {
    if (!isAdmin) {
      return navigate("/");
    }
  }

  useEffect(() => {
    verifyIsAdmin();
    fetch_all_users();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>Liste des utilisateurs</h1>
          </div>
        </div>
        <div className="row mt-4">
          {all_users.map((user) => {
            id++;
            return (
              <User
                key={id}
                isEven={id % 2 === 0}
                isAdmin={user.isAdmin}
                username={user.username}
                isConnected={user.token !== ""}
                rounded_top={id === 1}
                rounded_bottom={id === all_users.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
