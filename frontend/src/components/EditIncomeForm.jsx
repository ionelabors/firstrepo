import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const EditIncomeForm = ({ currentIncome, onSubmit, onCancel }) => {
  const [income, setIncome] = useState(currentIncome.toString());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income || parseFloat(income) < 0) return;
    onSubmit(parseFloat(income));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Update Monthly Income
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="income" className="text-sm font-medium text-slate-700">
              Monthly Income
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                $
              </span>
              <Input
                id="income"
                type="number"
                step="0.01"
                min="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="pl-8 border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                placeholder="0.00"
                required
              />
            </div>
            <p className="text-xs text-slate-500">
              Enter your total monthly income before expenses
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-white"
              disabled={!income || parseFloat(income) < 0}
            >
              Update Income
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditIncomeForm;