import { PiggyBank } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface WalletCardProps {
  type: "personal" | "business";
  balance: number;
  budget: number;
  budgetProgress: number;
  name: string;
  last30Days: number;
  last7Days: number;
}

export function WalletCard({
  type,
  balance,
  budget,
  budgetProgress,
  name,
  last30Days,
  last7Days
}: WalletCardProps) {
  const isPersonal = type === "personal";
  const borderColor = isPersonal ? "border-[#FEC6A1]" : "border-emerald-400";
  const iconColor = isPersonal ? "text-[#FEC6A1]" : "text-emerald-400";

  return (
    <Card className={`p-6 border-2 ${borderColor} hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">Balance</p>
        </div>
        <PiggyBank className={`w-8 h-8 ${iconColor}`} />
      </div>
      
      <div className="mb-6">
        <span className="text-3xl font-bold">$ {balance.toLocaleString()}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Last 30 days</p>
          <p className="font-medium">${last30Days.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last 7 days</p>
          <p className="font-medium">${last7Days.toLocaleString()}</p>
        </div>
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