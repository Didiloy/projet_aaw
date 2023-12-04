import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ErrorToast(props) {
  const { content } = props;
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setTimeout(() => {
      toggleShow(false);
    }, 5000);
  }, []);

  return (
    <div>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={show} onClose={toggleShow} className="">
          <Toast.Header className="bg-danger">
            <strong className="me-auto">Une erreur s'est produite !</strong>
          </Toast.Header>
          <Toast.Body>{content}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ErrorToast;
