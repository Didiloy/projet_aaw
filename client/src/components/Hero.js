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
      <div>
        <div className="row align-items-center g-lg-5 py-5 px-10 mx-auto font-bookantiqua">
          <div className="col-lg-7 text-center text-lg-start px-5 d-flex flex-column align-items-center justify-content-center">
            <h1 className="display-2 fw-bold lh-1 text-body-emphasis mb-3">
              AAW Citations
            </h1>
            <br />
            <p className="col-lg-10 fs-4 mx-auto font-bookantiqua">
              Bienvenue sur le site des citations ultimes flamboyantes inspirées
              de Marcel Proust. Laissez vous inspirer et rajoutez vos propres
              citations. Si vous manquez d'idées vous pouvez aller consulter les
              citations des autres utilisateurs.
            </p>
            <br />
            {username == ""
              ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p className="col-lg-10 fs-4 mx-auto font-bookantiqua">
                    Vous n'êtes pas connecté. Connectez-vous avec votre compte
                    discord pour ajouter des citations
                  </p>
                  <button
                    className="w-80 btn btn-lg btn-dark font-bookantiqua"
                    type="submit"
                    onClick={goToLogIn}
                  >
                    Connexion avec Discord
                  </button>
                </div>
              )
              : (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p className="fs-4 mx-auto font-bookantiqua">
                    Vous êtes connecté en tant que{" "}
                    <b>{username}</b>. Ajoutez ou lisez des citations.
                  </p>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link
                      to="/citations"
                      type="button"
                      className="btn btn-primary btn-lg px-4 gap-3 font-bookantiqua"
                    >
                      Voir les citations
                    </Link>
                    <button
                      onClick={handleDeconnexion}
                      type="button"
                      className="btn btn-danger btn-lg px-4 gap-3 font-bookantiqua"
                    >
                      Se deconnecter
                    </button>
                  </div>
                </div>
              )}
          </div>
          <div className="col-md-10 mx-auto col-lg-5 px-5 d-flex flex-column align-items-center justify-content-center">
            <img
              src="Marcel_Proust.jpg"
              width="500"
              height="580"
              className="rounded-3"
            />
            <p>Marcel Proust, auteur français, 1871-1922</p>
          </div>
        </div>
      </div>
    </div>
  );
}
