import React from 'react';
import { Entry } from '../types/Entry';

interface Props {
  entries: Entry[];
  type: 'Income' | 'Expense';
  total: number;
  onDelete: (id: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export default function EntryTable({ entries, type, total, onDelete }: Props) {
  return (
    <div className="entry-table">
      <h2>{type} List</h2>
      {entries.length === 0 ? (
        <p>No {type.toLowerCase()} entries yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.source}</td>
                <td>{formatCurrency(entry.amount)}</td>
                <td>{formatDate(entry.date)}</td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => onDelete(entry.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total:</td>
              <td>{formatCurrency(total)}</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}