// src/components/BalanceSummary.tsx
import React from 'react';

interface Props {
  balance: number;
}

export default function BalanceSummary({ balance }: Props) {
  return (
    <div className="totals">
      <div>Balance: <span>{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
    </div>
  );
}
