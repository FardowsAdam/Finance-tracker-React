import React, { useState } from 'react';
import './App.css';
import { Entry } from './types/Entry';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import EntryTable from './components/EntryTable';
import TargetInput from './components/TargetInput';
import BalanceSummary from './components/BalanceSummary'; 

function App() {
  const [incomes, setIncomes] = useState<Entry[]>([]);
  const [expenses, setExpenses] = useState<Entry[]>([]);
  const [target, setTarget] = useState<number>(0);

  const addIncome = (entry: Entry) => setIncomes([...incomes, entry]);
  const addExpense = (entry: Entry) => setExpenses([...expenses, entry]);

  const incomeTotal = incomes.reduce((sum, e) => sum + e.amount, 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = incomeTotal - expenseTotal;

  return (
    <div className="App">
      <h1>💰 Budget Tracker</h1>
      <TargetInput target={target} setTarget={setTarget} balance={balance} />

      <IncomeForm onAdd={addIncome} />
      <EntryTable entries={incomes} type="Income" total={incomeTotal} />

      <ExpenseForm onAdd={addExpense} />
      <EntryTable entries={expenses} type="Expense" total={expenseTotal} />

      <div className="totals">
        <div>Balance: <span>{balance.toFixed(2)}</span></div>
      </div>
    </div>
  );
}

export default App;

