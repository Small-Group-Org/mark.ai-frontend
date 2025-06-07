import React, { forwardRef } from "react";
import { InfoCardProps } from "../../types/mind";
import { cn } from "@/lib/utils";

export const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(({
  title,
  icon,
  children,
  isEmpty = false,
  className,
}, ref) => (
  <div ref={ref} className={cn("min-w-[300px] bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors", className)}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {isEmpty ? (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-slate-400">?</span>
        </div>
        <p className="text-gray-400 text-sm">No information learned yet</p>
      </div>
    ) : (
      <div className="space-y-3">{children}</div>
    )}
  </div>
));

InfoCard.displayName = "InfoCard";
