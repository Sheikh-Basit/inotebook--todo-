import React from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert'; // ✅ Make sure this is imported
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Aboutus from './Pages/Aboutus';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NoteProvider from './Context/NoteProvider';

function App() {
  return (
    <div className="App">
      <NoteProvider>
        <Router>
          <Navbar />
          <Alert /> {/* ✅ This will show context-based alert */}
          <Routes>
            <Route path="/" element={<Home />} />       {/* Home Page */}
            <Route path="/aboutus" element={<Aboutus />} />       {/* About Page */}
            <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
            <Route path="/login" element={<Login />} />   {/* Login Page */}
          </Routes>
        </Router>
      </NoteProvider>
    </div>
  );
}

export default App;
