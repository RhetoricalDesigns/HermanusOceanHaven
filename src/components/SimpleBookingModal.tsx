import React, { useState } from 'react';
import { X, Calendar, Users, Phone, Mail, Clock } from 'lucide-react';

interface SimpleBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
}

export const SimpleBookingModal: React.FC<SimpleBookingModalProps> = ({ isOpen, onClose, tourName }) => {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: 'Morning',
    adults: 1,
    children: 0,
    email: '',
    contact: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Booking Request for ${tourName}:
Date: ${formData.date}
Time: ${formData.timeSlot}
Adults: ${formData.adults}
Children: ${formData.children}
Email: ${formData.email}
Phone: ${formData.contact}`;
    window.open(`https://wa.me/27765588138?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Book {tourName}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Date</label>
            <input type="date" required className="w-full border rounded-lg p-2" onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Time</label>
            <select className="w-full border rounded-lg p-2" onChange={e => setFormData({...formData, timeSlot: e.target.value})}>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Adults</label>
              <input type="number" min="1" className="w-full border rounded-lg p-2" value={formData.adults} onChange={e => setFormData({...formData, adults: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Children</label>
              <input type="number" min="0" className="w-full border rounded-lg p-2" value={formData.children} onChange={e => setFormData({...formData, children: parseInt(e.target.value)})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input type="email" required className="w-full border rounded-lg p-2" onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Contact Number</label>
            <input type="tel" required className="w-full border rounded-lg p-2" onChange={e => setFormData({...formData, contact: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-cyan-700 text-white font-bold py-3 rounded-xl hover:bg-cyan-800 cursor-pointer">
            Send Reservation Request
          </button>
        </form>
      </div>
    </div>
  );
};
