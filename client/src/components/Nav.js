import React, { useState, useEffect } from "react";
import useClient from "../services/api";
import { changeUsername, changeIsAdmin } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {
  const client = useClient();
  const username = useSelector((state) => state.username.username);
  const isAdmin = useSelector((state) => state.isAdmin.isAdmin);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateUsername = (newUsername) => {
    dispatch(changeUsername(newUsername));
  };

  const handleUpdateIsAdmin = (newIsAdmin) => {
    dispatch(changeIsAdmin(newIsAdmin));
  };

  async function isConnected() {
    client.get("is-authenticated").then((data) => {
      if (data.isAuthenticated) {
        handleUpdateUsername(data.user.username);
        handleUpdateIsAdmin(data.user.isAdmin);
      }
      setIsAuthenticated(data.isAuthenticated);
    });
  }

  function handleDeconnexion() {
    fetch("/auth/logout", { method: "get" }).then(() => {
      window.location.href = "/";
    });
  }

  async function isConnected() {
    client.get("is-authenticated").then((data) => {
      //Il faut set les autre state avec isAuthenticated pck react redessine les composant
      setIsAuthenticated(data.isAuthenticated);
    });
  }

  useEffect(() => {
    isConnected();
  }, []);

  function goToLogIn() {
    window.location.href = "/auth/discord/login";
  }

  async function handleSearch(event) {
    event.preventDefault();
    const search = event.target[0].value;
    window.location.href = `/citations/search/${search}`;
  }

  useEffect(() => {
    isConnected();
  }, [username, isAdmin]);

  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          AAW Citations
        </Link>
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/citations">
                Citations
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/favorites">
                  Favoris
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin-panel">
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              className="form-control form-control-light text-bg-light"
              placeholder="Rechercher une citation.."
              aria-label="Search"
            />
          </form>
          {isAuthenticated ? (
            <div>
            <button
                onClick={handleDeconnexion}
                type="button"
                className="btn btn-danger btn-lg px-4 gap-3"
              >
                Déconnexion
              </button>
          </div>
          ) : (
            <div>
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={goToLogIn}
              >
                Connexion
              </button>
            </div>
          )
          }
        </div>
      </div>
    </nav>
  );
}
