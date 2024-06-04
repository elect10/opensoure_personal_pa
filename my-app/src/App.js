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
import Makepost from "./routes/Makepost";
import SignUp from "./routes/SignUp";

import Scrab from "./routes/Scrab";
import ProfilePage from "./routes/ProfilePage";
import PostsList from "./routes/PostsList";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/makepost" element={<Makepost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/scrab" element={<Scrab />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
}

export default App;
