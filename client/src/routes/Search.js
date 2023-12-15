import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CitationsList from "../components/CitationsList";
import useClient from "../services/api";
import { useSelector } from "react-redux";
export default function Search() {
  const { search } = useParams();
  const [all_citations, set_all_citations] = useState([]);
  const [all_citations_fetched, set_all_citations_fetched] = useState(false);
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

  const getCitations = (query) => {
    client
      .get(`get-quotes/${query}`)
      .then((data) => {
        set_all_citations(data);
        set_all_citations_fetched(true);
      })
      .catch((err) => {
        setErrorMessage("Il y a eu une erreur pendant la recherche.");
        toggleShowError();
        console.log("err fetching search result:" + err);
      });
  };

  const deleteCitation = (citationId) => {
    set_all_citations(all_citations.filter((c) => c.id !== citationId));
  };

  useEffect(() => {
    getCitations(search);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>Recherche</h1>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <p>Recherche de : {search}</p>
          </div>
        </div>
        {all_citations_fetched ? (
          all_citations.length > 0 ? (
            <CitationsList
              all_citations={all_citations}
              isAdmin={isAdmin}
              deleteCitation={deleteCitation}
              isAuthenticated={isAuthenticated}
            />
          ) : (
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <h3>Aucune citation ne correspond à votre recherche </h3>
              </div>
            </div>
          )
        ) : (
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <h3>Chargement des citations...</h3>
            </div>
          </div>
        )}
      </div>
      {showError ? <ErrorToast content={errorMessage} /> : <div />}
    </div>
  );
}
