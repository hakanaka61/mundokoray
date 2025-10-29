import React from "react";
import { Item } from "@/lib/types";

export function ItemPill({ item, featured = false }: { item: Item; featured?: boolean }) {
  return (
    <div
      className={
        "rounded-xl px-3 py-2 text-sm flex items-start gap-2 border " +
        (featured
          ? "bg-orange-600/20 border-orange-500 text-orange-100"
          : "bg-slate-700 border-slate-600 text-slate-100")
      }
    >
      <span className="text-lg leading-none">🛡️</span>
      <div className="flex flex-col leading-tight">
        <span className="font-medium">{item.name}</span>
        {item.why && (
          <span className="text-xs text-slate-300">{item.why}</span>
        )}
      </div>
    </div>
  );
}
