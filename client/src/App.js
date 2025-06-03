import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { Speach } from "./pages/Speach"
import { MakeSpeach} from "./pages/MakeSpeach"
import { Home } from "./pages/Home"
import "./styles/App.css"

export function App() {
  return (
    <Router>
       <div>
        <ul className="container-app">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/make">Make</Link>
          </li>
          <li>
            <Link to="/speach">Speach</Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make" element={<MakeSpeach />} />
        <Route path="/speach" element={<Speach />} />
      </Routes>
    </Router>
  );
}
