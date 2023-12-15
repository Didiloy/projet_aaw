import React, { useState, useEffect } from "react";
import Citation from "./Citation";
import { useSelector } from "react-redux";
import useClient from "../services/api";
export default function CitationsList(props) {
  const { all_citations, isAdmin, deleteCitation, isAuthenticated } = props;
  let [favorites, setFavorites] = useState([]);
  let [fetched_favorites, setFetched_favorites] = useState(false);
  let id = 0;
  const username = useSelector((state) => state.username.username);
  const client = useClient();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShowError = () => setShowError(!showError);

  const fetch_favorites = async () => {
    const fetch_favorites_aux = async () => {
      client
        .get("get-favorites/" + username)
        .then((data) => {
          let fav = [];
          data.map((citation) => {
            fav.push(citation.quoteId);
          });
          setFavorites(fav);
          setFetched_favorites(true);
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
  };

  useEffect(() => {
    fetch_favorites();
  }, []);

  return (
    <div className="row">
      {fetched_favorites ? (
        all_citations.map((citation) => {
          id++;
          return (
            <Citation
              key={id}
              id={id}
              isEven={id % 2 === 0}
              isAdmin={isAdmin}
              citation={citation.content}
              number={citation.id}
              author={citation.authorId}
              creation_date={citation.creation_date}
              rounded_top={id === 1}
              rounded_bottom={id === all_citations.length}
              deleteCitation={deleteCitation}
              isAuthenticated={isAuthenticated}
              isFav={favorites.includes(citation.id)}
            />
          );
        })
      ) : (
        <div className="col-12">
          <h1 className="text-center">Aucunes citations</h1>
        </div>
      )}
      {showError ? <ErrorToast content={errorMessage} /> : <div />}
    </div>
  );
}
