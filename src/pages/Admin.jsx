import React, { useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { app } from '../firebase/config';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Admin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  // Event CRUD States
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Registered Students State
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchEvents();
        fetchRegistrations();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'registrations'));
      const studentList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setRegistrations(studentList);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAuthMessage('Login failed: ' + err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setAuthMessage('Password reset email sent!');
    } catch (err) {
      setAuthMessage('Reset failed: ' + err.message);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!title || !date || !description) return;

    try {
      if (editingId) {
        const eventRef = doc(db, 'events', editingId);
        await updateDoc(eventRef, { title, date, time, location, description });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'events'), { title, date, time, location, description });
      }
      setTitle('');
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setTitle(event.title || '');
    setDate(event.date || '');
    setTime(event.time || '');
    setLocation(event.location || '');
    setDescription(event.description || '');
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isForgotPassword ? 'Reset Password' : 'Admin Login'}
        </h2>
        {authMessage && (
          <p className="mb-4 text-sm text-center text-red-500">{authMessage}</p>
        )}
        <form onSubmit={isForgotPassword ? handleResetPassword : handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              required 
              className="w-[#100%] p-2 border rounded mt-1" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          {!isForgotPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                required 
                className="w-[#100%] p-2 border rounded mt-1" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          )}
          <button type="submit" className="w-[#100%] bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isForgotPassword ? 'Send Reset Link' : 'Login'}
          </button>
        </form>
        <button 
          onClick={() => { setIsForgotPassword(!isForgotPassword); setAuthMessage(''); }}
          className="mt-4 text-xs text-blue-600 underline block text-center w-[#100%]"
        >
          {isForgotPassword ? 'Back to Login' : 'Forgot Password?'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md space-y-10">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Student Registrations Table */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Student Registrations</h2>
          <button 
            onClick={fetchRegistrations} 
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700"
          >
            🔄 Refresh List
          </button>
        </div>

        {registrations.length === 0 ? (
          <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded border text-center">
            No students have registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-[#100%] text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
                <tr>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Event Selected</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {registrations.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{item.fullName}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                        {item.selectedEvent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Create / Update Event Form */}
      <section className="p-4 bg-gray-50 rounded border space-y-4">
        <h2 className="text-xl font-semibold">{editingId ? 'Edit Event' : 'Add New Event Schedule'}</h2>
        
        <input 
          type="text" 
          placeholder="Event Title (e.g. AI & Cloud Workshop)" 
          className="w-[#100%] p-2 border rounded" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
            <input 
              type="date" 
              className="w-[#100%] p-2 border rounded" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Time</label>
            <input 
              type="text" 
              placeholder="e.g. 09:00 AM - 11:30 AM" 
              className="w-[#100%] p-2 border rounded" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Location / Venue</label>
            <input 
              type="text" 
              placeholder="e.g. Main Auditorium Hall A" 
              className="w-[#100%] p-2 border rounded" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
            />
          </div>
        </div>

        <textarea 
          placeholder="Event Description" 
          className="w-[#100%] p-2 border rounded" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />

        <div className="flex gap-2">
          <button type="submit" onClick={handleSaveEvent} className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
            {editingId ? 'Update Event' : 'Create Event'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { 
                setEditingId(null); 
                setTitle(''); setDate(''); setTime(''); setLocation(''); setDescription(''); 
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      {/* Manage Events Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Events</h2>
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-gray-500 text-sm">No custom events added yet.</p>
          ) : (
            events.map((item) => (
              <div key={item.id} className="p-4 border rounded flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {item.date} {item.time && `• ${item.time}`} {item.location && `• ${item.location}`}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}