import React, { useState } from 'react';
import { Entry } from '../types/Entry';

interface Props {
  onAdd: (entry: Entry) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ source, amount: parseFloat(amount), date });
    setSource('');
    setAmount('');
    setDate('');
  };

  return (
    <>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Source" value={source} onChange={e => setSource(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <button type="submit">Add Expense</button>
      </form>
    </>
  );
}
