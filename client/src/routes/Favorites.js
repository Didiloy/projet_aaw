import React, { useState, useEffect } from "react";
import CitationsList from "../components/CitationsList";
import { useSelector } from "react-redux";
import useClient from "../services/api";

export default function Favorites() {
  let [all_citations, set_all_citations] = useState([]);
  let [favorites, setFavorites] = useState([]);
  let [favorites_citations, setFavorites_citations] = useState([]);
  const client = useClient();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const username = useSelector((state) => state.username.username);
  const isAdmin = useSelector((state) => state.isAdmin.isAdmin);
  let [isAuthenticated, setIsAuthenticated] = useState(username !== "");

  useEffect(() => {
    setIsAuthenticated(username !== "");
  }, [username]);

  const toggleShowError = () => setShowError(!showError);

  const set_favorites_citations = () => {
    let fav_citations = [];
    all_citations.map((citation) => {
      if (favorites.includes(citation.id)) {
        fav_citations.push(citation);
      }
    });
    setFavorites_citations(fav_citations);
  };

  const fetch_favorites = async () => {
    const fetch_favorites_aux = async () => {
      client
        .get(`get-favorites/${username}`)
        .then((data) => {
          let fav = [];
          data.map((citation) => {
            fav.push(citation.quoteId);
          });
          setFavorites(fav);
        })
        .catch((err) => {
          setErrorMessage(
            "Il y a eu une erreur pendant la récupération des favoris."
          );
          toggleShowError();
          console.log("err fetching favorite:" + err);
        });
    };
    await fetch_favorites_aux();
    set_favorites_citations();
  };

  const fetch_all_citations = async () => {
    const fetch_all_citations_aux = async () => {
      client
        .get("get-quotes")
        .then((data) => {
          set_all_citations(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    await fetch_all_citations_aux();
  };

  useEffect(() => {
    fetch_all_citations();
    fetch_favorites();
  }, []);

  useEffect(() => {
    set_favorites_citations();
  }, [all_citations, favorites]);

  const deleteCitation = (citationId) => {
    set_all_citations(all_citations.filter((c) => c.id !== citationId));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>Favoris</h1>
          </div>
        </div>
        {favorites_citations.length > 0 ? (
          <CitationsList
            all_citations={favorites_citations}
            isAdmin={isAdmin}
            deleteCitation={deleteCitation}
            isAuthenticated={isAuthenticated}
          />
        ) : (
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <h1>Vous n'avez pas de favoris</h1>
            </div>
          </div>
        )}
      </div>
      {showError ? <ErrorToast content={errorMessage} /> : <div />}
    </div>
  );
}
