import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CitationsList from "../components/CitationsList";
import useClient from "../services/api";
export default function Search() {
  const { search } = useParams();
  const [all_citations, set_all_citations] = useState([]);
  const [all_citations_fetched, set_all_citations_fetched] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  const client = useClient();

  async function verifyUserInfos() {
    client.get("is-authenticated").then((data) => {
      //Il faut set les autre state avec isAuthenticated pck react redessine les composant
      setIsAuthenticated(data.isAuthenticated);
      if (data.isAuthenticated) {
        setIsAdmin(data.user.isAdmin);
      }
    });
  }

  const getCitations = (query) => {
    client
      .get(`get-quotes/${query}`)
      .then((data) => {
        set_all_citations(data);
        set_all_citations_fetched(true);
      })
      .catch((err) => {
        //TODO SHOW ERROR
        console.log("err fetching search result:" + err);
      });
  };

  const deleteCitation = (citationId) => {
    set_all_citations(all_citations.filter((c) => c.id !== citationId));
  };

  useEffect(() => {
    verifyUserInfos();
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
    </div>
  );
}
