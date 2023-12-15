import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Hero() {
  const store = useSelector((state) => state.username);
  const username = store.username;

  function goToLogIn() {
    window.location.href = "/auth/discord/login";
  }

  function handleDeconnexion() {
    fetch("/auth/logout", { method: "get" }).then(() => {
      window.location.href = "/";
    });
  }

  return (
    <div className="hero">
      {username != "" ? (
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold text-body-emphasis">
            AAW Citations
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Vous êtes connecté en tant que <b>{username}</b>. Ajoutez ou lisez
              des citations.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/citations"
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Voir les citations
              </Link>
              <button
                onClick={handleDeconnexion}
                type="button"
                className="btn btn-danger btn-lg px-4 gap-3"
              >
                Se deconnecter
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row align-items-center g-lg-5 py-5 px-10">
          <div className="col-lg-7 text-center text-lg-start px-5">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              AAW Citations
            </h1>
            <p className="col-lg-10 fs-4">
              Vous n'êtes pas connecté. Connectez-vous avec votre compte discord
              pour ajouter des citations
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5 px-5">
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={goToLogIn}
            >
              Login with Discord
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
