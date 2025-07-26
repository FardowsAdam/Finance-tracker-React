// src/components/SavingForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Saving } from '../types/Entry';

const savingSchema = z.object({
  amount: z.number().min(0, 'Amount cannot be negative'),
  target: z.number().min(0, 'Target cannot be negative'),
});

interface Props {
  saving: Saving;
  setSaving: (saving: Saving) => void;
}

export default function SavingForm({ saving, setSaving }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: saving,
    resolver: zodResolver(savingSchema),
  });

  const onSubmit = (data: Saving) => {
    setSaving(data);
  };

  return (
    <div className="saving-form">
      <h2>Savings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Current Amount:</label>
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && <p className="error">{errors.amount.message}</p>}
        </div>

        <div className="form-group">
          <label>Target Amount:</label>
          <input
            type="number"
            step="0.01"
            {...register('target', { valueAsNumber: true })}
          />
          {errors.target && <p className="error">{errors.target.message}</p>}
        </div>

        <button type="submit">Update Savings</button>
      </form>
    </div>
  );
}