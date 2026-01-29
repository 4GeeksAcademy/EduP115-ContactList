import { useReducer, useEffect } from "react";

const API_BASE = "https://playground.4geeks.com/contact";

const initialState = { contacts: [], agendaSlug: localStorage.getItem("agendaSlug") || "" };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AGENDA":
      localStorage.setItem("agendaSlug", action.payload);
      return { ...state, agendaSlug: action.payload };
    case "MUESTRA_CONTACTOS":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};

export const useGlobalReducer = () => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const setAgenda = (slug) => {
    dispatch({ type: "SET_AGENDA", payload: slug });
  };

  const AgendaExiste = async (agendaSlug) => {
    try {
      const respuesta = await fetch(`${API_BASE}/agendas/${agendaSlug}`);
      if (respuesta.status === 404) {
        const create = await fetch(`${API_BASE}/agendas/${agendaSlug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", accept: "application/json" },
          body: JSON.stringify({ name: agendaSlug, description: "My agenda" }),
        });
        if (!create.ok) {
          const x = await create.json().catch(() => null);
          throw new Error(x?.detail || `Agenda create failed (HTTP ${create.status})`);
        }
      }
    } catch (error) {
      console.error("AgendaExiste:", error);
    }
  };

  const obtenerContactos = async (slug = store.agendaSlug) => {
    if (!slug) return;
    try {
      const respuesta = await fetch(`${API_BASE}/agendas/${slug}/contacts`, {
        headers: { accept: "application/json" },
      });
      const data = await respuesta.json().catch(() => ([]));
      const list = Array.isArray(data) ? data : (data?.contacts ?? []);
      dispatch({ type: "MUESTRA_CONTACTOS", payload: list });
    } catch (error) {
      console.error("obtenerContactos:", error);
      dispatch({ type: "MUESTRA_CONTACTOS", payload: [] });
    }
  };

  const agregaContacto = async (contact) => {
    if (!store.agendaSlug) throw new Error("Agenda not selected");
    const payload = {
      name: (contact.name ?? "").trim(),
      email: (contact.email ?? "").trim(),
      phone: (contact.phone ?? "").trim(),
      address: (contact.address ?? "").trim(),
    };
    if (!payload.name || !payload.email) {
      throw new Error("Name and Email are required.");
    }
    const respuesta = await fetch(`${API_BASE}/agendas/${store.agendaSlug}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!respuesta.ok) {
      const x = await respuesta.json().catch(() => null);
      throw new Error(x?.detail || `Create failed (HTTP ${respuesta.status})`);
    }
    await obtenerContactos();
  };

  const modificaContacto = async (id, contact) => {
    if (!store.agendaSlug) throw new Error("Agenda not selected");
    const payload = {
      name: (contact.name ?? "").trim(),
      email: (contact.email ?? "").trim(),
      phone: (contact.phone ?? "").trim(),
      address: (contact.address ?? "").trim(),
    };
    if (!payload.name || !payload.email) {
      throw new Error("Name and Email are required.");
    }
    const respuesta = await fetch(`${API_BASE}/agendas/${store.agendaSlug}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!respuesta.ok) {
      const j = await respuesta.json().catch(() => null);
      throw new Error(j?.detail || `Update failed (HTTP ${respuesta.status})`);
    }
    await obtenerContactos();
  };

  const eliminarContacto = async (id) => {
    if (!store.agendaSlug) throw new Error("Agenda not selected");
    const respuesta = await fetch(`${API_BASE}/agendas/${store.agendaSlug}/contacts/${id}`, {
      method: "DELETE",
      headers: { accept: "application/json" },
    });
    if (!respuesta.ok) {
      const x = await respuesta.json().catch(() => null);
      throw new Error(x?.detail || `Delete failed (HTTP ${respuesta.status})`);
    }
    await obtenerContactos();
  };

  useEffect(() => {
    if (store.agendaSlug) {
      AgendaExiste(store.agendaSlug).then(() => obtenerContactos(store.agendaSlug));
    }
  }, [store.agendaSlug]);

  return {
    store,
    actions: { setAgenda, obtenerContactos, agregaContacto, modificaContacto, eliminarContacto },
  };
};