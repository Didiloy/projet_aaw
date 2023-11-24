import React, { useState, useEffect } from "react";
import CitationsList from "../components/CitationsList";
import { useSelector } from "react-redux";

export default function Favorites() {
  let [all_citations, set_all_citations] = useState([]);
  let [isAdmin, setIsAdmin] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [favorites, setFavorites] = useState([]);
  let [favorites_citations, setFavorites_citations] = useState([]);
  const username = useSelector((state) => state.username);

  const set_favorites_citations = () => {
    let fav_citations = [];
    all_citations.map((citation) => {
      if (favorites.includes(citation.id)) {
        fav_citations.push(citation);
      }
    });
    setFavorites_citations(fav_citations);
  };

  async function verifyUserInfos() {
    await fetch("/api/is-authenticated")
      .then((res) => res.json())
      .then((data) => {
        //Il faut set les autre state avec isAuthenticated pck react redessine les composant
        setIsAuthenticated(data.isAuthenticated);
        if (data.isAuthenticated) {
          setIsAdmin(data.user.isAdmin);
        }
      });
  }

  const fetch_favorites = async () => {
    const fetch_favorites_aux = async () => {
      fetch(`/api/get-favorites/${username}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let fav = [];
          data.map((citation) => {
            fav.push(citation.quoteId);
          });
          setFavorites(fav);
        })
        .catch((err) => {
          //TODO SHOW ERROR
          console.log("err fetching favorite:" + err);
        });
    };
    await fetch_favorites_aux();
    set_favorites_citations();
  };

  const fetch_all_citations = async () => {
    const fetch_all_citations_aux = async () => {
      //used to wait for the fetch to finish because it's not possible in useEffect
      fetch("/api/get-quotes")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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
    verifyUserInfos();
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
    </div>
  );
}
