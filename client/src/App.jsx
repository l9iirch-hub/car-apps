import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/common/MainLayout";
import LandingPage from "./pages/LandingPage";
import CarsListingPage from "./pages/CarsListingPage";
import CarDetailPage from "./pages/CarDetailPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import { LoginPage, RegisterPage } from "./pages/Auth";

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e1e1e",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="cars" element={<CarsListingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="cars/:id" element={<CarDetailPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="reservations"
              element={<div>Reservations Page - Coming Soon</div>}
            />
            <Route path="cars" element={<CarsManagement />} />
            <Route path="users" element={<Users />} />
            <Route path="stats" element={<Stats />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
