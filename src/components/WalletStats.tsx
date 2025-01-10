import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Transaction {
  id: string;
  type: "expense" | "income";
  amount: number;
  date: string;
  merchant: string;
  note: string;
  category: string;
}

interface WalletData {
  id: number;
  name: string;
  balance: number;
  type: string;
  budget: number;
  budgetProgress: number;
  last30Days: number;
  last7Days: number;
  transactions: Transaction[];
}

interface WalletStatsProps {
  wallet: WalletData;
}

const COLORS = ["#4ade80", "#f43f5e", "#fbbf24", "#60a5fa", "#a78bfa", "#f472b6"];

export function WalletStats({ wallet }: WalletStatsProps) {
  const categoryData = wallet.transactions?.reduce((acc: any, transaction) => {
    const category = transaction.category || "Other";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const barData = wallet.transactions?.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    const existingDay = acc.find((day) => day.date === date);
    
    if (existingDay) {
      if (transaction.type === "income") {
        existingDay.income += transaction.amount;
      } else {
        existingDay.expense += transaction.amount;
      }
    } else {
      acc.push({
        date,
        income: transaction.type === "income" ? transaction.amount : 0,
        expense: transaction.type === "expense" ? transaction.amount : 0,
      });
    }
    
    return acc;
  }, []);

  if (!wallet.transactions?.length) {
    return (
      <Card className="p-6 text-center">
        <img
          src="/lovable-uploads/a82a38ab-2e7c-4074-bcb1-75ddc57be526.png"
          alt="Empty state"
          className="mx-auto mb-4 w-48"
        />
        <h3 className="text-xl font-semibold mb-2">It's empty here!</h3>
        <p className="text-muted-foreground">Tap on + button to add your expense.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#4ade80" name="Income" />
              <Bar dataKey="expense" fill="#f43f5e" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Expense by Category</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {pieData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">
                {entry.name}: ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}