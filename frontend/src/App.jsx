import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './util/ProtectedRoute';
import { AuthProvider } from './util/AuthContext';
import Upload from './dashboard/Upload';
import Gallery from "./gallery/Gallery"; 
import GalleryDetail from "./gallery/GalleryDetail";
import ResetPassword from './pages/ResetPassword'; 
import Notifications from "./notification/Notifications.jsx";
import SharedGalleryPrompt from "./notification/SharedGalleryPrompt";
import SharedGalleryView from "./notification/SharedGalleryView";
import Profile from "./profile/Profile";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ===================== PUBLIC ROUTES ===================== */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Shared gallery email flow */}
          <Route path="/shared/:token" element={<SharedGalleryPrompt />} />
          <Route path="/shared/:token/view" element={<SharedGalleryView />} />
          <Route path="/notifications" element={<Notifications />} />

          {/* ===================== PROTECTED ROUTES ===================== */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:url" element={<GalleryDetail />} />
            <Route path="/profile" element={<Profile />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
