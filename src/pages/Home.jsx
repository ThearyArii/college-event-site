import React from 'react';
import CountdownTicket from '../components/CountdownTicket';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero / Home Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to College Events Platform</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover upcoming campus events, check timetables, and register instantly.
        </p>
        <CountdownTicket />
      </section>

      {/* About Us Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">About Us</h2>
        <p className="text-gray-600 leading-relaxed">
          Our platform aims to streamline student participation and simplify administrative organization for all university events, seminars, and workshops.
        </p>
      </section>

      {/* Our Services Section */}
      <section id="services" className="max-w-4xl mx-auto px-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-1">Event Schedules</h3>
            <p className="text-sm text-gray-600">Access real-time schedules and venue details for all active events.</p>
          </div>
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-1">Online Registration</h3>
            <p className="text-sm text-gray-600">Register for events quickly with digital confirmation tickets.</p>
          </div>
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-1">Media Gallery</h3>
            <p className="text-sm text-gray-600">Explore past event photos and highlight galleries.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact</h2>
        <div className="p-4 bg-gray-50 border rounded text-sm space-y-1">
          <p className="font-semibold text-gray-800">Sokuntheary Sin</p>
          <p className="text-gray-600">Instagram: <a href="https://instagram.com/sokuntheary.sin" target="_blank" rel="noreferrer" className="text-blue-600 underline">@sokuntheary.sin</a></p>
          <p className="text-gray-600">Email: <a href="mailto:sokuntheary.sin@college.edu" className="text-blue-600 underline">sokuntheary.sin@college.edu</a></p>
        </div>
      </section>
    </div>
  );
}