import React, { useState, useEffect } from "react";
import Citation from "./Citation";
import { useSelector } from "react-redux";
export default function CitationsList(props) {
  const { all_citations, isAdmin, deleteCitation, isAuthenticated } = props;
  let [favorites, setFavorites] = useState([]);
  let id = 0;
  const username = useSelector((state) => state.username);

  const fetch_favorites = () => {
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

  useEffect(() => {
    fetch_favorites();
  }, []);

  return (
    <div className="row">
      {all_citations.map((citation) => {
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
      })}
    </div>
  );
}
