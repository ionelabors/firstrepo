import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { mockBudgetData } from '../mock/data';
import AddExpenseForm from './AddExpenseForm';
import EditIncomeForm from './EditIncomeForm';
import { useToast } from '../hooks/use-toast';

const BudgetDashboard = () => {
  const [income, setIncome] = useState(mockBudgetData.income);
  const [expenses, setExpenses] = useState(mockBudgetData.expenses);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showEditIncome, setShowEditIncome] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const { toast } = useToast();

  // Calculate total expenses and remaining balance
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBalance = income - totalExpenses;

  const handleAddExpense = (newExpense) => {
    const expense = {
      ...newExpense,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses([...expenses, expense]);
    setShowAddExpense(false);
    toast({
      title: "Expense Added",
      description: `${expense.category} expense of $${expense.amount} added successfully.`,
    });
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    ));
    setEditingExpense(null);
    toast({
      title: "Expense Updated",
      description: "Expense has been updated successfully.",
    });
  };

  const handleDeleteExpense = (expenseId) => {
    const expenseToDelete = expenses.find(exp => exp.id === expenseId);
    setExpenses(expenses.filter(exp => exp.id !== expenseId));
    toast({
      title: "Expense Deleted",
      description: `${expenseToDelete.category} expense removed successfully.`,
      variant: "destructive",
    });
  };

  const handleUpdateIncome = (newIncome) => {
    setIncome(newIncome);
    setShowEditIncome(false);
    toast({
      title: "Income Updated",
      description: `Income updated to $${newIncome}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Budget Tracker</h1>
          <p className="text-slate-600">Manage your income and expenses with ease</p>
        </div>

        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Income Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" 
                onClick={() => setShowEditIncome(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Monthly Income</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">${income.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Click to edit</p>
            </CardContent>
          </Card>

          {/* Total Expenses Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">{expenses.length} expenses this month</p>
            </CardContent>
          </Card>

          {/* Remaining Balance Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Remaining Balance</CardTitle>
              <TrendingUp className={`h-4 w-4 ${remainingBalance >= 0 ? 'text-blue-600' : 'text-red-500'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${remainingBalance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                ${remainingBalance.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {remainingBalance >= 0 ? 'You\'re on track!' : 'Over budget'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Expenses Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-800">Expenses</CardTitle>
              <Button 
                onClick={() => setShowAddExpense(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg mb-4">No expenses recorded yet</p>
                <Button 
                  onClick={() => setShowAddExpense(true)}
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Expense
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.id} 
                       className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                            {expense.category}
                          </Badge>
                          <span className="font-semibold text-slate-800">
                            ${expense.amount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{expense.note}</p>
                        <span className="text-xs text-slate-500 mt-1">{expense.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setEditingExpense(expense)}
                        className="hover:bg-slate-200 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals/Forms */}
      {showAddExpense && (
        <AddExpenseForm 
          onSubmit={handleAddExpense}
          onCancel={() => setShowAddExpense(false)}
        />
      )}

      {editingExpense && (
        <AddExpenseForm 
          expense={editingExpense}
          onSubmit={handleEditExpense}
          onCancel={() => setEditingExpense(null)}
          isEditing={true}
        />
      )}

      {showEditIncome && (
        <EditIncomeForm 
          currentIncome={income}
          onSubmit={handleUpdateIncome}
          onCancel={() => setShowEditIncome(false)}
        />
      )}
    </div>
  );
};

export default BudgetDashboard;