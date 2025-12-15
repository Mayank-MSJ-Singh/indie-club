import React from 'react';

export interface BadgeProps {
    children: React.ReactNode;
    color?: 'slate' | 'indigo' | 'amber' | 'green';
    className?: string;
}

export const Badge = ({ children, color = 'slate', className = '' }: BadgeProps) => {
    const colors = {
        slate: "bg-slate-100 text-slate-700",
        indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
        amber: "bg-amber-50 text-amber-700 border-amber-100",
        green: "bg-emerald-50 text-emerald-700 border-emerald-100"
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${colors[color]} ${className}`}>
            {children}
        </span>
    );
};
