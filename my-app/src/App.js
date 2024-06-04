import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import Loginpic from "./routes/Loginpic";
import Login from "./routes/Login";
import Main from "./routes/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        
      </Routes>
    </Router>
  );
}

export default App;
