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
import GalleryDetail from "./gallery/CreateEvent";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes> 
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/signup" element={<><Navbar /><Signup /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:url" element={<GalleryDetail />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;