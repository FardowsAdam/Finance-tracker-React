import React, { useState } from 'react';
import './App.css';
import { Entry, Saving } from './types/Entry';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import EntryTable from './components/EntryTable';
import SavingForm from './components/savingForm';

function App() {
  const [incomes, setIncomes] = useState<Entry[]>([]);
  const [expenses, setExpenses] = useState<Entry[]>([]);
  const [saving, setSaving] = useState<Saving>({ amount: 0, target: 0 });

  const addIncome = (entry: Omit<Entry, 'id'>) => {
    setIncomes([...incomes, { ...entry, id: Date.now().toString() }]);
  };

  const addExpense = (entry: Omit<Entry, 'id'>) => {
    setExpenses([...expenses, { ...entry, id: Date.now().toString() }]);
  };

  const deleteEntry = (type: 'income' | 'expense', id: string) => {
    if (type === 'income') {
      setIncomes(incomes.filter(entry => entry.id !== id));
    } else {
      setExpenses(expenses.filter(entry => entry.id !== id));
    }
  };

  const transferToSaving = () => {
    const currentBalance = incomeTotal - expenseTotal;
    if (currentBalance > 0) {
      setSaving(prev => ({ ...prev, amount: prev.amount + currentBalance }));
      setIncomes([]);
      setExpenses([]);
    }
  };

  const incomeTotal = incomes.reduce((sum, e) => sum + e.amount, 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = incomeTotal - expenseTotal - saving.amount;
  const savingPercentage = saving.target > 0 ? (saving.amount / saving.target) * 100 : 0;

  return (
    <div className="App">
      <h1>💰 Budget Tracker</h1>
      
      <SavingForm saving={saving} setSaving={setSaving} />
      
      <div className="saving-info">
        <p>Current Saving: ${saving.amount.toFixed(2)}</p>
        <p>Target: ${saving.target.toFixed(2)}</p>
        <p>Progress: {savingPercentage.toFixed(1)}%</p>
        {savingPercentage >= 100 && <p className="success">Goal reached! 🎉</p>}
      </div>

      <IncomeForm onAdd={addIncome} />
      <EntryTable 
        entries={incomes} 
        type="Income" 
        total={incomeTotal} 
        onDelete={(id) => deleteEntry('income', id)} 
      />

      <ExpenseForm onAdd={addExpense} />
      <EntryTable 
        entries={expenses} 
        type="Expense" 
        total={expenseTotal} 
        onDelete={(id) => deleteEntry('expense', id)} 
      />

      <div className="balance-section">
        <div className="balance">Balance: ${balance.toFixed(2)}</div>
        {balance > 0 && (
          <button 
            className="transfer-btn" 
            onClick={transferToSaving}
          >
            Transfer to Savings
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

