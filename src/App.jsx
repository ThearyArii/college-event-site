import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Register from './pages/Register';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div>
        <NavBar />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}