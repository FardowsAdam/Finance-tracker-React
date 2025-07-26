import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Entry } from '../types/Entry';

const incomeSchema = z.object({
  source: z.string().min(1, 'Source is required'),
  amount: z.number().min(0.01, 'Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
});

interface Props {
  onAdd: (entry: Omit<Entry, 'id'>) => void;
}

export default function IncomeForm({ onAdd }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(incomeSchema),
  });

  const onSubmit = (data: any) => {
    onAdd({
      source: data.source,
      amount: data.amount,
      date: data.date,
    });
    reset();
  };

  return (
    <div className="income-form">
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Source:</label>
          <input 
            placeholder="Salary, Bonus, etc." 
            {...register('source')} 
          />
          {errors.source && <p className="error">{errors.source.message}</p>}
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input 
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('amount', { valueAsNumber: true })} 
          />
          {errors.amount && <p className="error">{errors.amount.message}</p>}
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            {...register('date')} 
          />
          {errors.date && <p className="error">{errors.date.message}</p>}
        </div>

        <button type="submit">Add Income</button>
      </form>
    </div>
  );
}