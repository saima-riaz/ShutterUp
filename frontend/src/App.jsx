import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
