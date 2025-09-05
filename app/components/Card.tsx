"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  const baseClasses = "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-300 dark:border-gray-700/50 rounded-2xl overflow-hidden";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}