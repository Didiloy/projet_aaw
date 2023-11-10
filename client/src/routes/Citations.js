import React, { useState } from "react";
import Nav from "../components/Nav";
import Citation from "../components/Citation";
export default function Citations() {
  let [citation_to_add, set_citation_to_add] = useState("");
  const modifyCitation = (event) => {
    set_citation_to_add(event.target.value);
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
        authorId: 1,
      }),
    })
      .then((response) => {
        //do something awesome that makes the world a better place
        modifyCitation("");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>Citations</h1>
          </div>
        </div>
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
        <div className="row">
          <div
            className="col-12 vw-100 mb-3 bg-secondary rounded-2"
            style={{
              height: "450px",
              overflowY: "scroll",
            }}
          >
            {/* boucle for avec les citations */}
            <Citation
              isAdmin={false}
              citation="Citation 1"
              number="1"
              author="Auteur 1"
            />
            <Citation
              isAdmin={true}
              citation="Citation 2"
              number="2"
              author="Auteur 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
