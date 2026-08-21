import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b bg-white">
      <Link to="/" className="text-2xl font-bold tracking-wider text-gray-900">
        CONVERGE<span className="text-blue-600">.</span>
      </Link>
      <div className="flex gap-6 text-xs font-semibold tracking-wider text-gray-600 uppercase">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/schedule" className="hover:text-blue-600">Schedule</Link>
        <Link to="/register" className="hover:text-blue-600">Register</Link>
        <Link to="/gallery" className="hover:text-blue-600">Gallery</Link>
        <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
      </div>
    </nav>
  );
}