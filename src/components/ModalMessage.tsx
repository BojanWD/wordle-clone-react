import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function ModalMessage({
  message,
  setMessage,
  guess,
}: {
  message: string;
  setMessage: Function;
  guess: number;
}) {
  const [show, setShow] = useState(false);

  const handleMessage = () => {
    if (message) {
      if (message === "Not enough letters") {
        setShow(true);
        setTimeout(() => {
          setShow(false);
          setMessage("");
        }, 500);
      }
      if (message === "Not in word list") {
        setShow(true);
        setTimeout(() => {
          setShow(false);
          setMessage("");
        }, 500);
      }
      if (message.startsWith("Well played")) {
        setShow(true);
      }
      if (message === "Unfortunately, you lose. Try again!") {
        setShow(true);
      }
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    handleMessage();
  }, [message]);

  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p
          className="modal-text"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        {(message.startsWith("Well played") ||
          message === "Unfortunately, you lose. Try again!") && (
          <div className="modal-btns">
            <button className="modal-btn" onClick={refreshPage}>
              Play again
            </button>{" "}
            <button className="modal-btn" onClick={() => setShow(false)}>
              Close
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalMessage;
