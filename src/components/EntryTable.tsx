import React from 'react';
import { Entry } from '../types/Entry';

interface Props {
  entries: Entry[];
  type: 'Income' | 'Expense';
  total: number;
}

const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2 });

export default function EntryTable({ entries, type, total }: Props) {
  return (
    <>
      <h2>{type} List</h2>
      <table>
        <thead>
          <tr><th>Source</th><th>Amount</th><th>Date</th></tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.source}</td>
              <td>{fmt(entry.amount)}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td>Total</td><td>{fmt(total)}</td><td></td></tr>
        </tfoot>
      </table>
    </>
  );
}
