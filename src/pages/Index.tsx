import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiggyBank, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletCard } from "@/components/WalletCard";
import { ExpenseOverview } from "@/components/ExpenseOverview";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

interface Wallet {
  id: number;
  name: string;
  balance: number;
  type: string;
  budget: number;
  budgetProgress: number;
  last30Days: number;
  last7Days: number;
}

export default function Index() {
  const navigate = useNavigate();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [total30Days, setTotal30Days] = useState(0);
  const [total7Days, setTotal7Days] = useState(0);

  useEffect(() => {
    // Initialize default wallets if none exist
    const storedWallets = localStorage.getItem("wallets");
    if (!storedWallets) {
      const defaultWallets = [
        {
          id: 1,
          name: "Personal",
          balance: 2500,
          type: "personal",
          budget: 3000,
          budgetProgress: 83,
          last30Days: 2000,
          last7Days: 500
        },
        {
          id: 2,
          name: "Business",
          balance: 5000,
          type: "business",
          budget: 8000,
          budgetProgress: 63,
          last30Days: 3000,
          last7Days: 1000
        }
      ];
      localStorage.setItem("wallets", JSON.stringify(defaultWallets));
      setWallets(defaultWallets);
    } else {
      setWallets(JSON.parse(storedWallets));
    }
  }, []);

  useEffect(() => {
    // Calculate totals
    const balanceTotal = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    const days30Total = wallets.reduce((sum, wallet) => sum + wallet.last30Days, 0);
    const days7Total = wallets.reduce((sum, wallet) => sum + wallet.last7Days, 0);
    
    setTotalBalance(balanceTotal);
    setTotal30Days(days30Total);
    setTotal7Days(days7Total);
  }, [wallets]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Wallets</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <Card className="p-6 mb-8 bg-primary text-primary-foreground">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm opacity-80">Total</p>
            <p className="text-2xl font-bold">${totalBalance.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Last 30 days</p>
            <p className="text-2xl font-bold">${total30Days.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Last 7 days</p>
            <p className="text-2xl font-bold">${total7Days.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            onClick={() => navigate(`/wallet/${wallet.id}`)}
            className="cursor-pointer"
          >
            <WalletCard
              type={wallet.type as "personal" | "business"}
              balance={wallet.balance}
              budget={wallet.budget}
              budgetProgress={wallet.budgetProgress}
              name={wallet.name}
              last30Days={wallet.last30Days}
              last7Days={wallet.last7Days}
            />
          </div>
        ))}
        
        <Button
          onClick={() => navigate("/add-wallet")}
          variant="outline"
          className="w-full py-8 border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add wallet
        </Button>
      </div>

      <ExpenseOverview />
    </div>
  );
}