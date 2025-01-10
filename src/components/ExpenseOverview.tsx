import { Card } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { categories } from "./ExpenseCategories";

interface Transaction {
  id: string;
  type: "expense" | "income";
  amount: number;
  category: string;
  date: string;
  merchant: string;
}

interface ExpenseOverviewProps {
  transactions: Transaction[];
}

export function ExpenseOverview({ transactions }: ExpenseOverviewProps) {
  const expenseData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc: { name: string; value: number }[], transaction) => {
      const category = categories.find(c => c.id === transaction.category);
      const existingCategory = acc.find(item => item.name === category?.name);
      
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else if (category) {
        acc.push({ name: category.name, value: transaction.amount });
      }
      
      return acc;
    }, []);

  const incomeData = transactions
    .filter(t => t.type === "income")
    .reduce((acc: { name: string; value: number }[], transaction) => {
      const category = categories.find(c => c.id === transaction.category);
      const existingCategory = acc.find(item => item.name === category?.name);
      
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else if (category) {
        acc.push({ name: category.name, value: transaction.amount });
      }
      
      return acc;
    }, []);

  const renderPieChart = (data: { name: string; value: number }[], title: string) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => {
                const category = categories.find(c => c.name === entry.name);
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={category?.color || "#94a3b8"} 
                  />
                );
              })}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Expense Overview</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {renderPieChart(incomeData, "Income Distribution")}
        {renderPieChart(expenseData, "Expense Distribution")}
      </div>
    </Card>
  );
}