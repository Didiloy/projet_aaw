import React, { useState } from "react";
export default function User(props) {
  const { username, isAdmin } = props;
  const isEven = props.isEven;
  const backgroundColor = isEven ? "bg-secondary-subtle" : "bg-primary-subtle";
  const rounded_top = props.rounded_top ? "rounded-top" : "";
  const rounded_bottom = props.rounded_bottom ? "rounded-bottom mb-5" : "";
  const css_class_name = `${backgroundColor} ${rounded_top} ${rounded_bottom}`;

  const handleOnClick = (event) => {
    event.preventDefault();
    fetch("/api/update-user/" + username, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        isAdmin: !isAdmin,
      }),
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        //TODO: handle error
      });
  };

  return (
    <div className={css_class_name} style={{ width: "100%", height: "auto" }}>
      <div className="d-flex justify-content-between">
        <div
          style={{ width: "80%" }}
          className="ms-3 mt-3 d-flex align-items-center"
        >
          <p className="fst-italic fw-bold">{username}</p>
        </div>
        <div className="d-flex align-items-center mt-1 mb-1">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleOnClick}
          >
            {isAdmin
              ? "Retirer les privilèges administateur"
              : "Donner des privilèges administateur"}
          </button>
        </div>
      </div>
    </div>
  );
}
