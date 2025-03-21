import React from 'react';

interface Customer {
  id: string;
  creditScore: number;
  loanAmount: number;
}

interface CustomerSelectProps {
  customers: Customer[];
  selectedCustomer: Customer;
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomerSelect({
  customers,
  selectedCustomer,
  onSelectCustomer,
}: CustomerSelectProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-blue-200">
        Select Customer
      </label>
      <select
        value={selectedCustomer.id}
        onChange={(e) => {
          const customer = customers.find(c => c.id === e.target.value);
          if (customer) onSelectCustomer(customer);
        }}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
      >
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id} className="bg-gray-900">
            {customer.id} - Credit Score: {customer.creditScore}
          </option>
        ))}
      </select>
    </div>
  );
}