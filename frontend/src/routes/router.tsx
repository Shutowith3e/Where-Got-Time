import { BrowserRouter, Routes, Route } from "react-router-dom";

// import files used for the routing (nav bar)
import NavBar from "../components/NavBar.tsx";
import LoginPage from "../pages/authentication/login/LoginPage.tsx";
import SignupPage from "../pages/authentication/signup/SignupPage.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
