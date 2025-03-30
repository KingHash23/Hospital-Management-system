import React from 'react';
import { Users, Calendar, Activity, Bell } from 'lucide-react';
import { patients, appointments } from '../data';

export default function Dashboard() {
  const stats = [
    { title: 'Total Patients', value: patients.length, icon: Users },
    { title: 'Appointments Today', value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length, icon: Calendar },
    { title: 'Active Cases', value: patients.length, icon: Activity },
    { title: 'Pending Reviews', value: 3, icon: Bell },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}