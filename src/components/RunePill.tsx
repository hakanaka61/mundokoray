import React from "react";

export function RunePill({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 rounded-lg bg-slate-700 text-slate-100 text-sm">
      {name}
    </span>
  );
}
