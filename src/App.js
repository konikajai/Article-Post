import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SavedArticles from "./components/SavedArticles";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import SingleArticle from "./components/SingleArticle";
import SignUp from "./components/SignUp";

// Lazy-load the Login component
const Login = React.lazy(() => import('./components/Login'));

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<p>Please Wait.....</p>}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/Profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/SavedArticles" element={<SavedArticles />} />
            <Route path="/SignUp" element={<SignUp />} /> 
            <Route path="/Login" element={<Login />} /> 
            <Route path="/SingleArticle/:id" element={<SingleArticle />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
