import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseCategories } from "@/components/ExpenseCategories";
import { WalletStats } from "@/components/WalletStats";
import { BudgetManager } from "@/components/BudgetManager";

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

export default function WalletDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    const currentWallet = wallets.find((w: WalletData) => w.id === Number(id));
    if (currentWallet && !currentWallet.transactions) {
      currentWallet.transactions = [];
    }
    setWallet(currentWallet || null);
  }, [id]);

  const handleAddTransaction = () => {
    if (!wallet || !amount || !merchant) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: Number(amount),
      date: new Date().toISOString(),
      merchant,
      note,
      category: selectedCategory
    };

    const updatedWallet = {
      ...wallet,
      transactions: [...(wallet.transactions || []), newTransaction],
      balance: transactionType === "income" 
        ? wallet.balance + Number(amount)
        : wallet.balance - Number(amount)
    };

    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    const updatedWallets = wallets.map((w: WalletData) =>
      w.id === wallet.id ? updatedWallet : w
    );

    localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    setWallet(updatedWallet);
    setShowAddTransaction(false);
    resetForm();
  };

  const resetForm = () => {
    setAmount("");
    setMerchant("");
    setNote("");
    setSelectedCategory("");
    setTransactionType("expense");
  };

  const handleUpdateBudget = (newBudget: number, period: "weekly" | "monthly") => {
    if (!wallet) return;

    const updatedWallet = {
      ...wallet,
      budget: newBudget,
      budgetPeriod: period
    };

    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    const updatedWallets = wallets.map((w: WalletData) =>
      w.id === wallet.id ? updatedWallet : w
    );

    localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    setWallet(updatedWallet);
  };

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{wallet.name}</h1>
          <Button onClick={() => setShowAddTransaction(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
        
        <BudgetManager
          budget={wallet.budget}
          spent={wallet.transactions
            .filter(t => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0)}
          onUpdateBudget={handleUpdateBudget}
        />

        {showAddTransaction ? (
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add Transaction</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAddTransaction(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <RadioGroup
                value={transactionType}
                onValueChange={(value) => setTransactionType(value as "expense" | "income")}
                className="flex justify-center gap-4 p-1 mb-6 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" className="peer sr-only" />
                  <Label
                    htmlFor="expense"
                    className={`px-3 py-2 rounded-md cursor-pointer ${
                      transactionType === "expense" ? "bg-background shadow-sm" : ""
                    }`}
                  >
                    Expense
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" className="peer sr-only" />
                  <Label
                    htmlFor="income"
                    className={`px-3 py-2 rounded-md cursor-pointer ${
                      transactionType === "income" ? "bg-background shadow-sm" : ""
                    }`}
                  >
                    Income
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <Label htmlFor="merchant">Merchant</Label>
                  <Input
                    id="merchant"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    placeholder="Enter merchant name"
                  />
                </div>

                <div>
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note"
                  />
                </div>

                <ExpenseCategories
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                <Button className="w-full" onClick={handleAddTransaction}>
                  <Check className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
            </div>
          </Card>
        ) : null}

        <WalletStats wallet={wallet} />
      </Card>
    </div>
  );
}
