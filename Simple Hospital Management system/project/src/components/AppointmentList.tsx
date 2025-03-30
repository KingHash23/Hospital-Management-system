import React, { useState } from 'react';
import { appointments } from '../data';
import Modal from './Modal';
import AddAppointmentForm from './AddAppointmentForm';
import { Calendar, Clock, User, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AppointmentList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleStatusChange = (appointmentId: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      appointment.status = newStatus;
      toast.success(`Appointment ${newStatus}`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Schedule Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">{appointment.patientName}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserPlus className="h-4 w-4" />
                <span>{appointment.doctorName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
            </div>

            {appointment.status === 'scheduled' && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleStatusChange(appointment.id, 'completed')}
                  className="flex-1 px-3 py-1 text-sm text-green-700 bg-green-100 rounded hover:bg-green-200 transition-colors"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                  className="flex-1 px-3 py-1 text-sm text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Appointment"
      >
        <AddAppointmentForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}