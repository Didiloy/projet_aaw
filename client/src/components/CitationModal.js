import React from "react";
export default function CitationModal(props) {
  const { title, content, creation_date, id } = props;
  const date = new Date(creation_date);
  const parsed_creation_date =
    "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  return (
    <div
      className="modal fade"
      id={"citationModal" + id}
      tabIndex="-1"
      aria-labelledby="citationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{content}</p>
          </div>
          <div className="modal-footer">
            <p>{parsed_creation_date}</p>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
