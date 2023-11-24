import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CitationsList from "../components/CitationsList";
export default function Citations() {
  let [citation_to_add, set_citation_to_add] = useState("");
  let [all_citations, set_all_citations] = useState([]);
  let [isAdmin, setIsAdmin] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const username = useSelector((state) => state.username);

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
  }, []);

  const modifyCitation = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    } else {
      set_citation_to_add(event.target.value);
    }
  };

  const deleteCitation = (citationId) => {
    set_all_citations(all_citations.filter((c) => c.id !== citationId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/create-quote", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        content: citation_to_add,
        authorId: username,
      }),
    })
      .then((response) => {
        //do something awesome that makes the world a better place
        set_citation_to_add("");
        response.json().then((data) => {
          console.log(data);
          fetch_all_citations();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>Citations</h1>
          </div>
        </div>
        {isAuthenticated ? (
          <div className="row d-flex flex-row">
            <div
              className="col-12 mb-3"
              style={{
                width: "100%",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-row justify-content-between align-item-between"
                role="search"
              >
                <input
                  type="search"
                  className="form-control form-control-light text-bg-light"
                  placeholder="Ajouter une citation.."
                  aria-label="Add a citation"
                  onChange={modifyCitation}
                  value={citation_to_add}
                />
                <button type="submit" className="btn btn-primary ms-5">
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-row justify-content-center align-item-center">
            <h3>Connectez vous pour ajouter une citation !</h3>
          </div>
        )}
        <CitationsList
          all_citations={all_citations}
          isAdmin={isAdmin}
          deleteCitation={deleteCitation}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}
