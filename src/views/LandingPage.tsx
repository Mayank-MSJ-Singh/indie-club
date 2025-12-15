import React from 'react';
import { PlusCircle, CheckCircle, Coins } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const LandingPage = ({ onLogin }: { onLogin: () => void }) => (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
        <nav className="w-full max-w-6xl mx-auto p-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg shadow-sm" />
                <div className="text-xl font-bold tracking-tight">Indie Club</div>
            </div>
            <div className="flex gap-4">
                <Button variant="ghost" onClick={onLogin}>Log In</Button>
                <Button variant="primary" onClick={onLogin}>Join Club</Button>
            </div>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-8 mb-20">
            <Badge color="indigo" className="mb-6 px-3 py-1">v1.0 Public Beta</Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
                Build together.<br />
                <span className="text-indigo-600">Get real feedback.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
                Stop building in isolation. Earn coins by reviewing others, spend them to get high-quality structured feedback on your MVP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-24">
                <Button variant="primary" className="text-lg px-8 py-3 h-auto" onClick={onLogin}>
                    Start Building
                </Button>
                <Button variant="secondary" className="text-lg px-8 py-3 h-auto" onClick={onLogin}>
                    Explore Projects
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full text-left">
                {[
                    { icon: <PlusCircle className="w-6 h-6 text-indigo-600" />, title: "Post your product", desc: "Share your MVP. Create structured review tasks." },
                    { icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, title: "Get real feedback", desc: "No 'great job' comments. Get actionable data." },
                    { icon: <Coins className="w-6 h-6 text-amber-500" />, title: "Earn reputation", desc: "Review others to earn coins and badges." }
                ].map((card, i) => (
                    <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                        <div className="mb-6 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                            {card.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{card.desc}</p>
                    </div>
                ))}
            </div>
        </main>

        <footer className="py-8 border-t border-slate-100 text-center text-slate-400 text-sm">
            &copy; 2024 Indie Club. Design for Builders.
        </footer>
    </div>
);
