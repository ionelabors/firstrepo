// Mock data for budget app

export const mockBudgetData = {
  income: 3000,
  expenses: [
    {
      id: '1',
      amount: 150,
      category: 'Food',
      note: 'Groceries and dining out',
      date: '2025-01-15'
    },
    {
      id: '2',
      amount: 80,
      category: 'Transportation',
      note: 'Gas and metro card',
      date: '2025-01-14'
    },
    {
      id: '3',
      amount: 50,
      category: 'Entertainment',
      note: 'Movie tickets and streaming',
      date: '2025-01-13'
    },
    {
      id: '4',
      amount: 120,
      category: 'Utilities',
      note: 'Internet and phone bill',
      date: '2025-01-12'
    }
  ]
};

export const expenseCategories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Education',
  'Travel',
  'Other'
];