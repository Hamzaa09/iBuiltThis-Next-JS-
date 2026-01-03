import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function StatsCard({
  icon: Icon,
  value,
  label,
  hasBorder,
}: {
  icon: LucideIcon;
  value: String;
  label: String;
  hasBorder?: boolean;
}) {
  return (
    <div className={cn("space-y-2", hasBorder && "md:border-x md:border-border/50")}>
      <div className="flex items-center justify-center gap-2">
        <Icon className="size-5 text-primary" />
        <p className="text-3xl sm:text-4xl font-bold">{value}</p>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
