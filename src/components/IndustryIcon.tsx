import {
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutGrid,
  Pickaxe,
  Plane,
  Ship,
  ShoppingBag,
  ShoppingBasket,
  Sprout,
  Truck,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IndustryIcon as IconKey } from "@/lib/clientModel";

export const industryIconParts: Record<IconKey, { Icon: LucideIcon; label: string }> = {
  factory: { Icon: Factory, label: "Factory" },
  ship: { Icon: Ship, label: "Ship" },
  pickaxe: { Icon: Pickaxe, label: "Pickaxe" },
  landmark: { Icon: Landmark, label: "Bank" },
  basket: { Icon: ShoppingBasket, label: "Basket" },
  grid: { Icon: LayoutGrid, label: "Grid" },
  truck: { Icon: Truck, label: "Truck" },
  zap: { Icon: Zap, label: "Energy" },
  building: { Icon: Building2, label: "Building" },
  health: { Icon: HeartPulse, label: "Health" },
  education: { Icon: GraduationCap, label: "Education" },
  cpu: { Icon: Cpu, label: "Technology" },
  plane: { Icon: Plane, label: "Plane" },
  utensils: { Icon: UtensilsCrossed, label: "Food" },
  sprout: { Icon: Sprout, label: "Agriculture" },
  shopping: { Icon: ShoppingBag, label: "Retail" },
};

export function IndustryIcon({ icon, size = 22, className }: { icon: IconKey; size?: number; className?: string }) {
  const { Icon } = industryIconParts[icon] ?? industryIconParts.grid;
  return <Icon size={size} className={className} />;
}
