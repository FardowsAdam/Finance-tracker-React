import React from 'react';

interface Props {
  target: number;
  setTarget: (val: number) => void;
  balance: number;
}

export default function TargetInput({ target, setTarget, balance }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(e.target.value));
  };

  const progress = target > 0 ? balance / target : 0;

  const message = !target
    ? 'No target set'
    : progress >= 1
    ? `Goal reached 🎉 (saved ${balance.toFixed(2)})`
    : `Progress: ${(progress * 100).toFixed(1)}%`;

  const statusClass = !target ? 'warning' : progress >= 1 ? 'success' : 'warning';

  return (
    <>
      <label>
        Saving Target (💸):
        <input
          type="number"
          min="0"
          placeholder="e.g. 5000"
          value={target || ''}
          onChange={handleChange}
        />
      </label>
      <span className={statusClass}>{message}</span>
    </>
  );
}
