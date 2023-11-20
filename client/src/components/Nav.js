import React, { useState, useEffect } from "react";
export default function Nav() {
  let [isAdmin, setIsAdmin] = useState(false);
  async function verifyIsAdmin() {
    await fetch("/api/is-authenticated")
      .then((res) => res.json())
      .then((data) => {
        //Il faut set les autre state avec isAuthenticated pck react redessine les composant
        if (data.isAuthenticated) {
          setIsAdmin(data.user.isAdmin);
        }
      });
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
