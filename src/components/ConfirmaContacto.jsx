import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmaContacto = ({ show, onHide, onConfirm, contactName }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmar eliminar contacto</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Esta seguro que deseas eliminar <strong>{contactName}</strong>?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm}>Delete</Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmaContacto;