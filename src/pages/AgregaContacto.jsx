import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store.jsx";
import { useNavigate, useParams, Link } from "react-router-dom";

const AgregaContacto = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  if (!store.agendaSlug) {
    return (
      <div className="text-center mt-5">
        <h4>Please select an agenda first</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Select Agenda
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const c = store.contacts.find((c) => c.id === Number(id));
      if (c) {
        setFormData({
          name: c.name ?? "",
          email: c.email ?? "",
          phone: c.phone ?? "",
          address: c.address ?? "",
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (id) await actions.modificaContacto(id, formData);
      else await actions.agregaContacto(formData);
      navigate("/");
    } catch (error) {
      setError(error.message || "Operation failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h1 className="text-center mb-4">{id ? "Edit contact" : "Add a new contact"}</h1>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </form>

          <Link to="/">
            <p className="text-primary mt-3 text-decoration-underline">
              or get back to contacts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgregaContacto;