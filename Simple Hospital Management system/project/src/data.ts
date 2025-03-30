import { Patient, Appointment, Doctor, Bill } from './types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    contact: '555-0125',
    email: 'sarah.wilson@hospital.com',
    availability: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: '2',
    name: 'Dr. Michael Brown',
    specialization: 'Neurology',
    contact: '555-0126',
    email: 'michael.brown@hospital.com',
    availability: ['Tuesday', 'Thursday', 'Saturday']
  }
];

const bills: Bill[] = [
  {
    id: '1',
    patientId: '1',
    description: 'Initial Consultation',
    amount: 150,
    date: '2024-03-15',
    status: 'pending'
  },
  {
    id: '2',
    patientId: '1',
    description: 'Blood Test',
    amount: 75,
    date: '2024-03-15',
    status: 'paid'
  }
];

export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    contact: '555-0123',
    condition: 'Hypertension',
    admissionDate: '2024-03-15',
    bills: bills.filter(bill => bill.patientId === '1')
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    contact: '555-0124',
    condition: 'Diabetes',
    admissionDate: '2024-03-14',
    bills: []
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Wilson',
    date: '2024-03-20',
    time: '10:00 AM',
    status: 'scheduled',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Michael Brown',
    date: '2024-03-21',
    time: '2:30 PM',
    status: 'scheduled',
  }
];