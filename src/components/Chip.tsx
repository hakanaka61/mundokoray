import React from "react";

export function Chip({
  children,
  tone = "default"
}: {
  children: React.ReactNode;
  tone?: "default" | "danger" | "positive";
}) {
  const tones: Record<string, string> = {
    default: "bg-slate-700 text-slate-100",
    danger: "bg-red-600/80 text-white",
    positive: "bg-emerald-600/80 text-white"
  };

  return (
    <span
      className={
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " +
        tones[tone]
      }
    >
      {children}
    </span>
  );
}
