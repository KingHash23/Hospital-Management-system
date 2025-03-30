import React, { useState } from 'react';
import { patients } from '../data';
import Modal from './Modal';
import AddPatientForm from './AddPatientForm';
import BillingForm from './BillingForm';
import { toast } from 'react-hot-toast';

export default function PatientList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const handleBilling = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsBillingModalOpen(true);
  };

  const handlePayBill = (patientId: string, billId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      const bill = patient.bills.find(b => b.id === billId);
      if (bill) {
        bill.status = 'paid';
        toast.success('Bill marked as paid');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Patients</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{patient.name}</h3>
                <p className="text-sm text-gray-500">{patient.age} years old • {patient.gender}</p>
              </div>
              <button
                onClick={() => handleBilling(patient.id)}
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
              >
                Add Bill
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">Contact:</span> {patient.contact}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Condition:</span> {patient.condition}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Admitted:</span> {patient.admissionDate}
              </p>
            </div>

            {patient.bills.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-sm text-gray-700 mb-2">Bills</h4>
                <div className="space-y-2">
                  {patient.bills.map((bill) => (
                    <div
                      key={bill.id}
                      className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{bill.description}</p>
                        <p className="text-gray-500">${bill.amount}</p>
                      </div>
                      {bill.status === 'pending' ? (
                        <button
                          onClick={() => handlePayBill(patient.id, bill.id)}
                          className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded hover:bg-green-200 transition-colors"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded">
                          Paid
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium">
                  Total: ${patient.bills.reduce((sum, bill) => sum + bill.amount, 0)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Patient"
      >
        <AddPatientForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isBillingModalOpen}
        onClose={() => setIsBillingModalOpen(false)}
        title="Add New Bill"
      >
        {selectedPatientId && (
          <BillingForm
            patientId={selectedPatientId}
            onClose={() => setIsBillingModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}