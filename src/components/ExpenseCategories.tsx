import { Label } from "@/components/ui/label";
import { 
  Utensils, ShoppingBag, Plane, Home, CreditCard, Briefcase, Bus,
  HeartPulse, GraduationCap, Gamepad2, PawPrint, Gift, Building2,
  Users, User, PiggyBank, HelpCircle
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export const categories: Category[] = [
  { id: "food", name: "Food", icon: <Utensils className="h-4 w-4" />, color: "#f43f5e" },
  { id: "shopping", name: "Shopping", icon: <ShoppingBag className="h-4 w-4" />, color: "#a855f7" },
  { id: "travel", name: "Travel", icon: <Plane className="h-4 w-4" />, color: "#0ea5e9" },
  { id: "housing", name: "Housing", icon: <Home className="h-4 w-4" />, color: "#3b82f6" },
  { id: "bills", name: "Bills", icon: <CreditCard className="h-4 w-4" />, color: "#f59e0b" },
  { id: "salary", name: "Salary", icon: <Briefcase className="h-4 w-4" />, color: "#10b981" },
  { id: "transport", name: "Transport", icon: <Bus className="h-4 w-4" />, color: "#6366f1" },
  { id: "healthcare", name: "Healthcare", icon: <HeartPulse className="h-4 w-4" />, color: "#ec4899" },
  { id: "education", name: "Education", icon: <GraduationCap className="h-4 w-4" />, color: "#84cc16" },
  { id: "entertainment", name: "Entertainment", icon: <Gamepad2 className="h-4 w-4" />, color: "#06b6d4" },
  { id: "pets", name: "Pets", icon: <PawPrint className="h-4 w-4" />, color: "#f97316" },
  { id: "gifts", name: "Gifts", icon: <Gift className="h-4 w-4" />, color: "#eab308" },
  { id: "insurance", name: "Insurance", icon: <Building2 className="h-4 w-4" />, color: "#8b5cf6" },
  { id: "childcare", name: "Childcare", icon: <Users className="h-4 w-4" />, color: "#ef4444" },
  { id: "personal", name: "Personal Care", icon: <User className="h-4 w-4" />, color: "#14b8a6" },
  { id: "investments", name: "Investments", icon: <PiggyBank className="h-4 w-4" />, color: "#22c55e" },
  { id: "other", name: "Miscellaneous", icon: <HelpCircle className="h-4 w-4" />, color: "#94a3b8" }
];

interface ExpenseCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ExpenseCategories({ selectedCategory, onSelectCategory }: ExpenseCategoriesProps) {
  return (
    <div className="space-y-4">
      <Label>Category</Label>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
              selectedCategory === category.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: category.color + "20", color: category.color }}
            >
              {category.icon}
            </div>
            <span className="text-xs text-center">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}