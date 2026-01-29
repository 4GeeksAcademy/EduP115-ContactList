import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout"; 
import VerContacto from "./pages/VerContacto";
import AgregaContacto from "./pages/AgregaContacto";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}> 
      <Route index element={<VerContacto />} />
      <Route path="add-contact" element={<AgregaContacto />} />
      <Route path="edit-contact/:id" element={<AgregaContacto />} />
    </Route>
  )
);