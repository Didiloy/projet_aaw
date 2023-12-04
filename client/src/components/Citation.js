import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CitationModal from "./CitationModal";
import useClient from "../services/api";
import ErrorToast from "./ErrorToast";
export default function Citation(props) {
  const {
    citation,
    isAdmin,
    author,
    creation_date,
    id,
    isAuthenticated,
    number,
    isFav,
  } = props;
  const username = useSelector((state) => state.username);
  const isEven = props.isEven;
  const backgroundColor = isEven ? "bg-secondary-subtle" : "bg-primary-subtle";
  const rounded_top = props.rounded_top ? "rounded-top" : "";
  const rounded_bottom = props.rounded_bottom ? "rounded-bottom mb-5" : "";
  const css_class_name = `${backgroundColor} ${rounded_top} ${rounded_bottom}`;
  const citation_id = number;
  let [isFavorite, setIsFavorite] = useState(isFav);
  const client = useClient();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShowError = () => setShowError(!showError);

  const handleFavorite = async (event) => {
    event.preventDefault();
    if (isFavorite) {
      //delete from favorite
      client
        .delete(`delete-favorite/${username}/${citation_id}`)
        .then((data) => {
          if (data.isDeleted) setIsFavorite(false);
          else {
            setIsFavorite(true);
            setErrorMessage(
              "Il y a eu une erreur pendant la suppression du favoris."
            );
            toggleShowError();
            console.log("err deleting favorite:" + data.message);
          }
        })
        .catch((err) => {
          setErrorMessage(
            "Il y a eu une erreur pendant la suppression du favoris."
          );
          toggleShowError();
          console.log("err deleting favorite:" + err);
        });
    } else {
      //add to favorite
      client
        .post(`create-favorite`, {
          quoteId: citation_id,
          userId: username,
        })
        .then((data) => {
          setIsFavorite(true);
        })
        .catch((err) => {
          setErrorMessage(
            "Il y a eu une erreur pendant la création du favoris."
          );
          toggleShowError();
          console.log("err adding favorite:" + err);
        });
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await fetch("/api/delete-quote/" + props.number, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        props.deleteCitation(props.number);
      })
      .catch((err) => {
        console.log("err: " + err);
      });
  };

  useEffect(() => {
    // console.log("isFav: " + isFavorite);
  }, []);

  return (
    <div className={css_class_name} style={{ width: "100%", height: "auto" }}>
      <div className="d-flex justify-content-between">
        <div style={{ width: "70%" }} className="ms-3 mt-3">
          <p className="fst-italic">{author}</p>
          <br />
          <p>{citation}</p>
        </div>
        <div className="ms-5 me-1 mt-5">
          <div className="d-flex justify-content-between ps-2 pe-2">
            {isAdmin ? (
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            ) : (
              <div />
            )}
            <button
              type="button"
              className="btn btn-primary ms-2 me-2"
              data-bs-toggle="modal"
              data-bs-target={"#citationModal" + id}
            >
              Voir plus d'infos
            </button>
            {isAuthenticated ? (
              isFavorite ? (
                <button
                  type="button"
                  className="btn ms-2 me-2"
                  onClick={handleFavorite}
                >
                  <i className="fa fa-star" aria-hidden="false"></i>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn ms-2 me-2"
                  onClick={handleFavorite}
                >
                  <i className="fa fa-star-o" aria-hidden="false"></i>
                </button>
              )
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
      <CitationModal
        title={author}
        content={citation}
        creation_date={creation_date}
        id={id}
      />
      {showError ? <ErrorToast content={errorMessage} /> : <div />}
    </div>
  );
}
