import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase/config';

const db = getFirestore(app);

// Your original hardcoded events list with time and venue details
const initialEvents = [
  {
    id: 'initial-1',
    title: 'Opening Ceremony & Keynote',
    time: '09:00 AM - 10:30 AM',
    location: 'Main Auditorium',
    description: 'Welcome address by campus leaders and keynote presentation.',
    date: '2026-09-15'
  },
  {
    id: 'initial-2',
    title: 'Tech & Innovation Workshop',
    time: '11:00 AM - 02:00 PM',
    location: 'Lab Room 302',
    description: 'Hands-on project showcases and student team competitions.',
    date: '2026-09-16'
  },
  {
    id: 'initial-3',
    title: 'Cultural Night & Music Fest',
    time: '05:00 PM - 09:00 PM',
    location: 'Campus Open Field',
    description: 'Live student performances, food stalls, and music awards.',
    date: '2026-09-17'
  }
];

export default function Schedule() {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    const fetchAdminEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const firebaseEvents = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        
        setEvents([...initialEvents, ...firebaseEvents]);
      } catch (error) {
        console.error("Error fetching admin events:", error);
      }
    };

    fetchAdminEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Event Schedule</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-5 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
              <p className="text-gray-600 text-sm">{event.description}</p>
              
              <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500 mt-2">
                {event.time && (
                  <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded">
                    🕒 {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded">
                    📍 {event.location}
                  </span>
                )}
              </div>
            </div>

            <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded whitespace-nowrap self-start">
              {event.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}