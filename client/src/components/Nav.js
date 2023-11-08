import React from "react";
export default function Nav() {
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
            <li className="nav-item">
              <a className="nav-link text-light" href="/login">
                Login
              </a>
            </li>
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
