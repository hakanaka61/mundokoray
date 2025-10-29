import React from "react";
import { Item } from "@/lib/types";

export function ItemPill({ item }: { item: Item }) {
  return (
    <div className="rounded-xl bg-slate-700 px-3 py-2 text-sm text-slate-100 flex items-start gap-2">
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
