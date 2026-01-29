import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store.jsx";
import TarjetaContacto from "../components/TarjetaContacto";

const VerContacto = () => {
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState(store.agendaSlug);

  const handleSetAgenda = () => {
    if (inputValue.trim()) {
      actions.setAgenda(inputValue.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSetAgenda();
    }
  };

  if (!store.agendaSlug) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card shadow">
              <div className="card-body p-5">
                <h1 className="text-center mb-4">Contact List</h1>
                <p className="text-center text-muted mb-4">
                  Enter an agenda name to get started
                </p>

                <div className="mb-3">
                  <label className="form-label fw-bold">Agenda Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Agenda"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <small className="text-muted d-block mt-2">
                    Enter a name to create a new agenda or load an existing one
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleSetAgenda}
                >
                  Load Agenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Agenda: <strong>{store.agendaSlug}</strong></h4>
        </div>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => actions.setAgenda("")}
          >
            Change Agenda
          </button>
          <Link className="btn btn-success" to="/add-contact">
            Add a contact
          </Link>
        </div>
      </div>

      <div className="row">
        {store.contacts.length === 0 ? (
          <h4 className="text-center">No contacts to show. Add one!</h4>
        ) : (
          store.contacts.map((contact) => (
            <TarjetaContacto key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </>
  );
};

export default VerContacto;