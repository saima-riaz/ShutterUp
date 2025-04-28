import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './util/ProtectedRoute';
import { AuthProvider } from './util/AuthContext';
import Upload from './dashboard/Upload';



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
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;