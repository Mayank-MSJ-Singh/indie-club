import React from 'react';
import { Filter, Coins, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { REVIEWS } from '../data/mock';

export const CoinReviewsView = () => (
    <div className="max-w-5xl mx-auto h-[calc(100vh-2rem)] flex flex-col animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-bold mb-2 tracking-tight">Coin Tasks</h2>
                <p className="text-slate-500">Earn coins by providing high-quality feedback. <span className="text-indigo-600 font-medium cursor-pointer">How it works?</span></p>
            </div>
            <div className="flex gap-3">
                <Button variant="secondary" className="text-sm"><Filter size={14} /> Filter</Button>
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm text-slate-600">
                    Sort by: <span className="text-indigo-600">Reward High to Low</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-12 pr-2">
            {REVIEWS.map(review => (
                <div key={review.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <Badge color="amber" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-100 pl-1.5 pr-2.5 py-1">
                            <Coins size={14} className="fill-amber-500 text-amber-500" /> <span className="font-bold">{review.reward}</span>
                        </Badge>
                        <Badge color="slate">{review.category}</Badge>
                    </div>

                    <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-indigo-600 transition-colors">{review.task}</h3>
                    <p className="text-sm text-slate-500 mb-6 flex-1 border-l-2 border-slate-100 pl-3">
                        Project: <span className="font-medium text-slate-700 block mt-0.5">{review.project}</span>
                    </p>

                    <div className="mt-auto border-t border-slate-50 pt-4 flex items-center justify-between">
                        <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1.5 border border-emerald-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Open
                        </span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Clock size={12} /> {review.time} est.</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
