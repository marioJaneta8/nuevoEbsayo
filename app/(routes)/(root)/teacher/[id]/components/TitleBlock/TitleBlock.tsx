'use client';

import { LucideIcon } from "lucide-react";


interface TitleBlockProps {
  title: string;
  icon: LucideIcon;
}

export const TitleBlock = ({ title, icon: Icon }: TitleBlockProps) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      
      <div className="p-2 rounded-full bg-violet-400 text-white">
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};
