import React, { useState, useEffect } from "react";
import useClient from "../services/api";
export default function Nav() {
  let [isAdmin, setIsAdmin] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  const client = useClient();
  async function verifyIsAdmin() {
    client.get(`is-authenticated`).then((data) => {
      if (data.isAuthenticated) {
        setIsAdmin(data.user.isAdmin);
        setIsAuthenticated(data.isAuthenticated);
      }
    });
  }

  async function handleSearch(event) {
    event.preventDefault();
    const search = event.target[0].value;
    window.location.href = `/citations/search/${search}`;
  }

  useEffect(() => {
    verifyIsAdmin();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="/">
          AAW Citations
        </a>
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-light" href="/citations">
                Citations
              </a>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link text-light" href="/favorites">
                  Favoris
                </a>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <a className="nav-link text-light" href="/admin-panel">
                  Admin Panel
                </a>
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
        </div>
      </div>
    </nav>
  );
}
