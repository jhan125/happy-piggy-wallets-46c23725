import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { categories } from "./ExpenseCategories";
import { ExpenseOverview } from "./ExpenseOverview";
import { format } from "date-fns";

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
  onEditTransaction?: (transaction: Transaction) => void;
  onDeleteTransaction?: (transactionId: string) => void;
}

export function WalletStats({ wallet, onEditTransaction, onDeleteTransaction }: WalletStatsProps) {
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

      <ExpenseOverview transactions={wallet.transactions} />

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {wallet.transactions.map((transaction) => {
            const category = categories.find(c => c.id === transaction.category);
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 cursor-pointer"
                onClick={() => onEditTransaction?.(transaction)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: category?.color + "20", 
                      color: category?.color 
                    }}
                  >
                    {category?.icon}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.merchant}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={transaction.type === "expense" ? "text-destructive" : "text-green-500"}>
                    {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{category?.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}