import { PiggyBank, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletCard } from "@/components/WalletCard";
import { ExpenseOverview } from "@/components/ExpenseOverview";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert className="mb-8 bg-primary border-none">
        <AlertDescription className="flex items-center gap-2">
          <PiggyBank className="w-5 h-5" />
          <span>Welcome back! Let's keep track of your expenses today. 🐷</span>
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Wallets</h2>
        <Button className="bg-pink-500 hover:bg-pink-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Wallet
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <WalletCard
          type="personal"
          balance={2500}
          budget={3000}
          budgetProgress={83}
        />
        <WalletCard
          type="business"
          balance={5000}
          budget={8000}
          budgetProgress={63}
        />
      </div>

      <ExpenseOverview />
    </div>
  );
}