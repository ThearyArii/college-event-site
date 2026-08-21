import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { app } from '../firebase/config';

const db = getFirestore(app);

// Initial event options for registration
const defaultOptions = [
  'Hackathon',
  'Battle of Bands',
  'Dance Finals',
  'Just the fest (no competition)'
];

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [eventOptions, setEventOptions] = useState(defaultOptions);
  const [selectedEvent, setSelectedEvent] = useState(defaultOptions[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchEventsForDropdown = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const customTitles = querySnapshot.docs
          .map((docSnap) => docSnap.data().title)
          .filter(Boolean);
        
        // Merge default list with custom events created in Admin
        const combined = Array.from(new Set([...defaultOptions, ...customTitles]));
        setEventOptions(combined);
      } catch (error) {
        console.error("Error fetching dropdown events:", error);
      }
    };

    fetchEventsForDropdown();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save student registration to Firestore
      await addDoc(collection(db, 'registrations'), {
        fullName,
        email,
        selectedEvent,
        registeredAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border rounded-lg shadow-sm text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-600">Registration Confirmed!</h2>
        <p className="text-gray-600 text-sm">
          Thank you <span className="font-semibold text-gray-800">{fullName}</span>. You are registered for <span className="font-semibold text-gray-800">{selectedEvent}</span>.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setFullName(''); setEmail(''); }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Register Another Student
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white border rounded-xl shadow-sm space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-red-500 font-semibold mb-1">
          One form, all events
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Register</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
            Full Name
          </label>
          <input 
            type="text" 
            placeholder="Jordan Lee" 
            required 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            className="w-[#100%] p-3 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input 
            type="email" 
            placeholder="jordan@college.edu" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-[#100%] p-3 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
            Select Event
          </label>
          <select 
            value={selectedEvent} 
            onChange={(e) => setSelectedEvent(e.target.value)} 
            className="w-[#100%] p-3 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {eventOptions.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-[#100%] bg-red-500 text-white py-3 rounded-lg font-semibold uppercase text-sm tracking-wider hover:bg-red-600 transition mt-2"
        >
          Confirm Registration
        </button>
      </form>
    </div>
  );
}