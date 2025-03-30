import React, { useState } from 'react';
import { doctors } from '../data';
import Modal from './Modal';
import AddDoctorForm from './AddDoctorForm';
import { UserPlus, Phone, Mail, Calendar } from 'lucide-react';

export default function DoctorList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Doctors</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add Doctor
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-medium text-lg">{doctor.name}</h3>
            <p className="text-sm text-blue-600">{doctor.specialization}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{doctor.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <div className="flex flex-wrap gap-1">
                  {doctor.availability.map((day) => (
                    <span
                      key={day}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Doctor"
      >
        <AddDoctorForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}