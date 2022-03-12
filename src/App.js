import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import UpdateUser from './components/UpdateUser';
import { useAuth } from './context/AuthContext';
import ForgetPassword from './components/ForgetPassword';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={currentUser ? <Dashboard /> : <Navigate replace to="/login" />} />
            <Route path="/update" element={currentUser ? <UpdateUser /> : <Navigate replace to="/login" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-pass" element={<ForgetPassword />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
