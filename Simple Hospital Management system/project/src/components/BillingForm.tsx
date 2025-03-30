import React, { useState } from 'react';
import { patients } from '../data';

export default function BillingForm({ patientId, onClose }: { patientId: string; onClose: () => void }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      const newBill = {
        id: (patient.bills.length + 1).toString(),
        patientId,
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString().split('T')[0],
        status: 'pending' as const
      };
      patient.bills.push(newBill);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          required
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
          Add Bill
        </button>
      </div>
    </form>
  );
}