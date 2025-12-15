import React from 'react';
import { CheckCircle, ThumbsUp, PlusCircle } from 'lucide-react';

export const ReputationView = () => (
    <div className="max-w-2xl mx-auto text-center pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative inline-block mb-8 group cursor-default">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center relative z-10 border-[6px] border-slate-50 shadow-2xl">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600">850</span>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 px-4 py-1.5 rounded-full shadow-lg border border-slate-700 text-xs font-bold text-white uppercase tracking-widest z-20">
                Rep Score
            </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-2">Expert Builder</h2>
        <p className="text-slate-500 mb-10">Top 5% of community. Trusted Reviewer.</p>

        <div className="grid grid-cols-3 gap-4 mb-12">
            {[
                { label: "Reviews Given", val: "42", icon: <CheckCircle className="text-emerald-500" />, color: "bg-emerald-50 border-emerald-100" },
                { label: "Reviews Accepted", val: "38", icon: <ThumbsUp className="text-indigo-500" />, color: "bg-indigo-50 border-indigo-100" },
                { label: "Projects Posted", val: "3", icon: <PlusCircle className="text-purple-500" />, color: "bg-purple-50 border-purple-100" }
            ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-transform hover:-translate-y-1 ${stat.color}`}>
                    {stat.icon}
                    <span className="text-3xl font-bold text-slate-900">{stat.val}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{stat.label}</span>
                </div>
            ))}
        </div>
    </div>
);
