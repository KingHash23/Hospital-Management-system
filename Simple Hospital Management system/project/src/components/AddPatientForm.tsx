import React, { useState } from 'react';
import { patients } from '../data';

export default function AddPatientForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    condition: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = {
      id: (patients.length + 1).toString(),
      ...formData,
      age: parseInt(formData.age),
      admissionDate: new Date().toISOString().split('T')[0],
      bills: []
    };
    patients.push(newPatient);
    onClose();
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
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
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
        <label className="block text-sm font-medium text-gray-700">Condition</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.condition}
          onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
        />
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
          Add Patient
        </button>
      </div>
    </form>
  );
}