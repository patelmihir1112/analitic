import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProfileNew from './pages/ProfileNew';
import DashboardNew from './pages/DashboardNew'
import Navbar from './pages/Navbar'
import NavbarNew from './pages/NavbarNew'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/NavbarNew" element={<NavbarNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileNew" element={<ProfileNew />} />
          <Route path="/dashboardNew" element={<DashboardNew />} />



          {/* <Route path="/Sample/:id" element={<Sample1 />} /> */}
          {/* <Route path="/Sample" element={<Sample />} /> */}
          {/* <Route path="/BlogDetail" element={<BlogDetail />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
