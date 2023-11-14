import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "..";
import Nav from "../components/Nav";
import Citation from "../components/Citation";
export default function Citations() {
  const [user] = useContext(UserContext);
  let [citation_to_add, set_citation_to_add] = useState("");
  let [all_citations, set_all_citations] = useState([]);
  let id = 0;
  console.log("User: " + user);

  const fetch_all_citations = () => {
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
  useEffect(fetch_all_citations, []);

  const modifyCitation = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    } else {
      set_citation_to_add(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    console.log("user: " + user);
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
        authorId: user, //TODO
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
            {all_citations.map((citation) => {
              id++;
              return (
                <Citation
                  isAdmin={false}
                  citation={citation.content}
                  number={citation.id}
                  author={citation.authorId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
