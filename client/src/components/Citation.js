import React, { useState } from "react";
export default function Citation(props) {
  const { citation, isAdmin, author } = props;
  const isEven = props.isEven;
  const backgroundColor = isEven ? "bg-secondary-subtle" : "bg-primary-subtle";
  const rounded_top = props.rounded_top ? "rounded-top" : "";
  const rounded_bottom = props.rounded_bottom ? "rounded-bottom mb-5" : "";
  const css_class_name = `${backgroundColor} ${rounded_top} ${rounded_bottom}`;
  console.log(citation);

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

  return (
    <div className={css_class_name} style={{ width: "100%", height: "auto" }}>
      <div className="d-flex justify-content-between">
        <div style={{ width: "80%" }} className="ms-3 mt-3">
          <p className="fst-italic">{author}</p>
          <br />
          <p>{citation}</p>
        </div>
        <div className="ms-5 me-1 mt-5">
          {isAdmin ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
