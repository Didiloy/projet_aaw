import React from "react";
import { useSelector } from "react-redux";
export default function Hero(props) {
  const username = useSelector((state) => state.username);

  function goToCitations() {
    window.location.href = "/citations";
  }

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
      {props.isConnected ? (
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
              <button
                onClick={goToCitations}
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Voir les citations
              </button>
              <button
                onClick={handleDeconnexion}
                type="button"
                className="btn btn-danger btn-lg px-4 gap-3"
              >
                Se deconnecter
              </button>
            </div>
          </div>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Bienvenue sur le site des citations ultimes flamboyantes inspirées de Marcel Proust.
              Laissez vous inspirer et rajouter vos propres citations.
              Si vous manquez d'idées vous pouvez aller consulter les citations des autres utilisateurs.
              Pour une meilleure utilisation vous pouvez vous connecter grâce à votre compte discord.
            </p>
          </div>
        </div>
      ) : (
       <div> 
        <div className="row align-items-center g-lg-5 py-5 px-10 mx-auto font-bookantiqua">
          <div className="col-lg-7 text-center text-lg-start px-5">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              AAW Citations
            </h1>
            <p className="col-lg-10 fs-4 mx-auto font-bookantiqua">
              Vous n'êtes pas connecté. Connectez-vous avec votre compte discord
              pour ajouter des citations
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5 px-5"> 
            <button
              className="w-80 btn btn-lg btn-dark font-bookantiqua"
              type="submit"
              onClick={goToLogIn}
            >
              Connexion avec Discord
            </button>
          </div>
            
        </div>
        <div className="row align-items-center g-lg-5 py-5 px-10">
          <div className="col-md-10 mx-auto col-lg-5 px-5">
            <img src="Marcel_Proust.jpg" width="400" height="480"/>
          </div>
          <div className="col-lg-6 mx-auto fs-4 px-5 font-bookantiqua">
            <p>
              Bienvenue sur le site des citations ultimes flamboyantes inspirées de Marcel Proust.
              Laissez vous inspirer et rajouter vos propres citations.
              Si vous manquez d'idées vous pouvez aller consulter les citations des autres utilisateurs.
              Pour une meilleure utilisation vous pouvez vous connecter grâce à votre compte discord.
            </p>
            <img src="Ecran_Accueil.jpg" width="580" height="350" />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}