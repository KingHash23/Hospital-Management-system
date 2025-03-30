import React, { useState } from 'react';
import { doctors } from '../data';

export default function AddDoctorForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
    email: '',
    availability: [] as string[]
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoctor = {
      id: (doctors.length + 1).toString(),
      ...formData
    };
    doctors.push(newDoctor);
    onClose();
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Specialization</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.specialization}
          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
        <div className="flex flex-wrap gap-2">
          {days.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-3 py-1 rounded-full text-sm ${
                formData.availability.includes(day)
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-gray-100 text-gray-800 border-gray-300'
              } border`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
}