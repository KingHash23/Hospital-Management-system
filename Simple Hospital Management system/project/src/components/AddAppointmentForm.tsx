import React, { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { doctors, patients, appointments } from '../data';

export default function AddAppointmentForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = patients.find(p => p.id === formData.patientId);
    const doctor = doctors.find(d => d.id === formData.doctorId);
    
    if (!patient || !doctor) {
      toast.error('Please select both patient and doctor');
      return;
    }

    const dayOfWeek = new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' });
    if (!doctor.availability.includes(dayOfWeek)) {
      toast.error(`Dr. ${doctor.name} is not available on ${dayOfWeek}s`);
      return;
    }

    const newAppointment = {
      id: (appointments.length + 1).toString(),
      patientName: patient.name,
      doctorName: doctor.name,
      date: formData.date,
      time: formData.time,
      status: 'scheduled' as const,
    };

    appointments.push(newAppointment);
    toast.success('Appointment scheduled successfully');
    onClose();
  };

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
        >
          <option value="">Select Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Doctor</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.doctorId}
          onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          required
          min={format(new Date(), 'yyyy-MM-dd')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        >
          {availableTimes.map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          Schedule Appointment
        </button>
      </div>
    </form>
  );
}