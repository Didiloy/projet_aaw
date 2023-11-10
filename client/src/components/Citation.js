import React, { useState } from "react";
export default function Citation(props) {
  const { citation, isAdmin, author } = props;
  const isEven = props.number % 2 === 0;
  const backgroundColor = isEven ? "bg-secondary-subtle" : "bg-primary-subtle";
  const css_class_name = `${backgroundColor} mb-2 mt-2 rounded-2`;
  console.log(citation);

  const handleDelete = (event) => {};

  return (
    <div className={css_class_name} style={{ width: "100%", height: "auto" }}>
      <div className="row" style={{ width: "100%", height: "auto" }}>
        <div style={{ width: "80%" }} className="ms-3 fst-italic">
          <p>{author}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2 mt-2">
        <div style={{ width: "80%" }} className="ms-3">
          <p>{citation}</p>
        </div>
        {isAdmin ? (
          <button
            type="button"
            className="btn btn-danger ms-5"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
