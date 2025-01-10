import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface WalletData {
  id: number;
  name: string;
  balance: number;
  type: string;
  budget: number;
  budgetProgress: number;
  last30Days: number;
  last7Days: number;
}

export default function WalletDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletData | null>(null);

  useEffect(() => {
    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    const currentWallet = wallets.find((w: WalletData) => w.id === Number(id));
    setWallet(currentWallet || null);
  }, [id]);

  if (!wallet) {
    return <div>Wallet not found</div>;
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">{wallet.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary/10 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
            <p className="text-2xl font-bold">${wallet.balance.toLocaleString()}</p>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Last 30 Days</h3>
            <p className="text-2xl font-bold">${wallet.last30Days.toLocaleString()}</p>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Last 7 Days</h3>
            <p className="text-2xl font-bold">${wallet.last7Days.toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}