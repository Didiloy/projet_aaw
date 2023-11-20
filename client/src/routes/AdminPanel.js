import React, { useState, useEffect } from "react";
import User from "../components/User";
export default function AdminPanel() {
  let [all_users, set_all_users] = useState([]);
  let id = 0;

  const fetch_all_users = () => {
    fetch("/api/get-all-users")
      .then((response) => response.json())
      .then((data) => {
        set_all_users(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function verifyIsAdmin() {
    await fetch("/api/is-authenticated")
      .then((res) => res.json())
      .then((data) => {
        //Il faut set les autre state avec isAuthenticated pck react redessine les composant
        if (!data.user.isAdmin) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        window.location.href = "/";
      });
  }

  useEffect(() => {
    verifyIsAdmin();
    fetch_all_users();
  }, []);

  useEffect(() => {
    console.log(all_users);
  }, [all_users]);

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
