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
//login to main page - posting
import Loginpic from "./routes/Loginpic";
import Login from "./routes/Login";
import Main from "./routes/Main";
import Makepost from "./routes/Makepost";
import SignUp from "./routes/SignUp";

// profile page
import ProfilePage from "./routes/ProfilePage";
import PostsList from "./routes/PostsList";
import Portfolio from "./routes/Portfolio";
import ApplicationList from "./routes/ApplicatonList";
import AccountInformation from "./routes/AccountInformation";
import ApplicationPort from "./routes/ApplicationPort";
import ProjectDescription from "./routes/ProjectDescription";
import TeamEvaluation from "./routes/TeamEvaluation";
import TeamMemberEvaluation from "./routes/TeamMemberEvaluation";

//scrab page
import Scrab from "./routes/Scrab";


function App() {
  const projectId = "1";
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
        <Route path="/posts" element={<PostsList />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/applicationList" element={<ApplicationList />} />
        <Route path="/accountInformation" element={<AccountInformation />} />
        <Route path="/applicationPort" element={<ApplicationPort />} />
        <Route path="/project-description" element={<ProjectDescription projectId ={projectId}/>} />
        <Route path="/evaluation" element={<TeamEvaluation />} />
        <Route path="/evaluation/:memberId" element={ <TeamMemberEvaluation />} />
        

      </Routes>
    </Router>
  );
}

export default App;
