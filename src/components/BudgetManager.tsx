import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, Edit2 } from "lucide-react";

interface BudgetManagerProps {
  budget: number;
  spent: number;
  onUpdateBudget: (budget: number, period: "weekly" | "monthly") => void;
}

export function BudgetManager({ budget, spent, onUpdateBudget }: BudgetManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");
  const { toast } = useToast();

  const progress = budget > 0 ? (spent / budget) * 100 : 0;
  const isOverBudget = spent > budget;
  const isNearBudget = spent > budget * 0.8;

  // Move alerts to useEffect to prevent infinite re-renders
  useEffect(() => {
    if (isNearBudget && !isOverBudget) {
      toast({
        title: "Budget Alert",
        description: "You're approaching your budget limit!",
        variant: "destructive",
      });
    }

    if (isOverBudget) {
      toast({
        title: "Budget Exceeded",
        description: "You've exceeded your budget limit!",
        variant: "destructive",
      });
    }
  }, [isNearBudget, isOverBudget, toast]);

  const handleSave = () => {
    const budgetValue = parseFloat(newBudget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      toast({
        title: "Invalid Budget",
        description: "Please enter a valid budget amount",
        variant: "destructive",
      });
      return;
    }
    onUpdateBudget(budgetValue, period);
    setIsEditing(false);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Budget Management</h2>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Budget
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <Label>Budget Amount</Label>
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="Enter budget amount"
            />
          </div>

          <div>
            <Label>Budget Period</Label>
            <RadioGroup
              value={period}
              onValueChange={(value) => setPeriod(value as "weekly" | "monthly")}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleSave} className="flex-1">
              <Check className="h-4 w-4 mr-2" />
              Save Budget
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-2xl font-bold">${budget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className={`text-2xl font-bold ${isOverBudget ? "text-destructive" : ""}`}>
                ${spent.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Usage</span>
              <span className={isOverBudget ? "text-destructive" : ""}>
                {progress.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={Math.min(progress, 100)} 
              className={`h-3 ${isOverBudget ? "bg-destructive/20" : ""}`}
            />
          </div>
        </div>
      )}
    </Card>
  );
}