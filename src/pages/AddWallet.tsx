import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AddWallet() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [walletName, setWalletName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing wallets from localStorage
    const existingWallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    
    // Create new wallet
    const newWallet = {
      id: Date.now(),
      name: walletName,
      balance: parseFloat(initialBalance) || 0,
      type: "custom",
      budget: 1000, // Default budget
      budgetProgress: 0,
      last30Days: 0,
      last7Days: 0
    };
    
    // Add new wallet to existing wallets
    localStorage.setItem("wallets", JSON.stringify([...existingWallets, newWallet]));
    
    toast({
      title: "Success",
      description: "Wallet created successfully!",
    });
    
    navigate("/");
  };

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
        <h1 className="text-2xl font-bold mb-6">Create New Wallet</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Wallet Name
            </label>
            <Input
              required
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="e.g., Travel Fund, Business Expenses"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Initial Balance
            </label>
            <Input
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              placeholder="0.00"
              className="w-full"
              step="0.01"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Create Wallet
          </Button>
        </form>
      </Card>
    </div>
  );
}