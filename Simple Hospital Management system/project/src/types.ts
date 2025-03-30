export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  condition: string;
  admissionDate: string;
  bills: Bill[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  contact: string;
  email: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Bill {
  id: string;
  patientId: string;
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
}