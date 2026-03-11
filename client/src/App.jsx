import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/common/MainLayout';
import LandingPage from './pages/LandingPage';
import CarsListingPage from './pages/CarsListingPage';

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1e1e1e',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      }} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="cars" element={<CarsListingPage />} />
            <Route path="about" element={<div className="pt-32 text-center text-2xl">Experience Page</div>} />
            <Route path="login" element={<div className="pt-32 text-center text-2xl">Login Page</div>} />
            <Route path="register" element={<div className="pt-32 text-center text-2xl">Register Page</div>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
