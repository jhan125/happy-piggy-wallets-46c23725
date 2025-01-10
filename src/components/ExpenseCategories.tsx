import { Label } from "@/components/ui/label";
import { ShoppingBag, Utensils, Plane, Home, CreditCard, Briefcase } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: "shopping", name: "Shopping", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "food", name: "Food", icon: <Utensils className="h-4 w-4" /> },
  { id: "travel", name: "Travel", icon: <Plane className="h-4 w-4" /> },
  { id: "housing", name: "Housing", icon: <Home className="h-4 w-4" /> },
  { id: "bills", name: "Bills", icon: <CreditCard className="h-4 w-4" /> },
  { id: "salary", name: "Salary", icon: <Briefcase className="h-4 w-4" /> },
];

interface ExpenseCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ExpenseCategories({ selectedCategory, onSelectCategory }: ExpenseCategoriesProps) {
  return (
    <div className="space-y-4">
      <Label>Category</Label>
      <div className="grid grid-cols-3 gap-4">
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
            {category.icon}
            <span className="mt-2 text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}