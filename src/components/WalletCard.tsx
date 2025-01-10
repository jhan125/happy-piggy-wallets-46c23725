import { PiggyBank } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface WalletCardProps {
  type: "personal" | "business";
  balance: number;
  budget: number;
  budgetProgress: number;
}

export function WalletCard({ type, balance, budget, budgetProgress }: WalletCardProps) {
  const isPersonal = type === "personal";
  const borderColor = isPersonal ? "border-[#FEC6A1]" : "border-emerald-400";
  const iconColor = isPersonal ? "text-[#FEC6A1]" : "text-emerald-400";

  return (
    <Card className={`p-6 border-2 ${borderColor} hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold capitalize">{type}</h3>
          <p className="text-sm text-muted-foreground">Balance</p>
        </div>
        <PiggyBank className={`w-8 h-8 ${iconColor}`} />
      </div>
      
      <div className="mb-6">
        <span className="text-3xl font-bold">$ {balance.toLocaleString()}</span>
      </div>
      
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Budget</span>
          <span>{budgetProgress}%</span>
        </div>
        <Progress value={budgetProgress} className="h-2" />
      </div>
    </Card>
  );
}