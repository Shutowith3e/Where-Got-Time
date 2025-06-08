import { BrowserRouter, Routes, Route } from "react-router-dom";

// import files used for the routing (landing page for now)
import LoginPage from "../pages/authentication/login/LoginPage.tsx";
import SignupPage from "../pages/authentication/signup/SignupPage.tsx";
import LandingPage from "../pages/landing/LandingPage.tsx";
import ContributePage from "../pages/landing/ContributePage.tsx";

//protected pages
import Wrapper from "@/pages/protected/Wrapper.tsx";
import MainUserPage from "@/pages/protected/MainUserPage.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/*Protected Routes */}
        <Route
          path="/mainUser"
          element={
            <Wrapper>
              <MainUserPage />
            </Wrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
