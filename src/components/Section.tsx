import React from "react";

export function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-4 space-y-3">
      <h3 className="text-slate-100 font-semibold tracking-wide">{title}</h3>
      {children}
    </div>
  );
}
