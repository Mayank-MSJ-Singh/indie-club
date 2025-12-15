import React, { useState } from 'react';
import { ArrowRight, Globe, Github, Coins, Lock, Briefcase, MessageSquare, CheckCircle, ThumbsUp, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PROJECTS } from '../data/mock';

export const ProjectView = ({ projectId, onBack }: { projectId: number, onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'reviews' | 'chat'>('overview');
    const project = PROJECTS.find(p => p.id === projectId) || PROJECTS[0];

    return (
        <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
            <button onClick={onBack} className="text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-2 text-sm font-medium transition-colors">
                <ArrowRight className="rotate-180" size={16} /> Back to Feed
            </button>

            {/* Header */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 mb-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">{project.title}</h1>
                        <div className="flex gap-4 text-slate-500 text-sm">
                            <a href="#" className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors"><Globe size={15} /> zenith-writer.com</a>
                            <a href="#" className="hover:text-indigo-600 flex items-center gap-1.5 transition-colors"><Github size={15} /> github.com/zenith</a>
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto justify-between md:justify-start">
                        <div className="flex items-center gap-2">
                            <div className="text-right hidden md:block">
                                <p className="font-semibold text-sm leading-none">{project.author}</p>
                                <p className="text-slate-400 text-xs">High Reputation</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold border border-slate-200">AB</div>
                        </div>
                        <Badge color="green" className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Beta</Badge>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-slate-100 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'comments', label: 'Comments (45)' },
                        { id: 'reviews', label: 'Serious Reviews', icon: <Coins size={14} className="text-amber-500" /> },
                        { id: 'chat', label: 'Project Chat', icon: <Lock size={14} /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`pb-3 flex items-center gap-2 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
                        >
                            {tab.label} {tab.icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="animate-in fade-in duration-300">
                {activeTab === 'overview' && (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Briefcase size={18} className="text-indigo-600" /> The Pitch</h3>
                            <p className="text-slate-600 leading-7">
                                Zenith is designed to keep you in the flow state. Unlike other AI writers that require cloud connectivity, Zenith runs a quantized LLaMA model locally on your machine. This means zero latency, total privacy, and offline capability. It's built with Rust and Tauri for maximum performance.
                            </p>
                        </section>
                        <div className="h-px bg-slate-100 w-full" />
                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MessageSquare size={18} className="text-indigo-600" /> Needed Feedback</h3>
                            <ul className="grid gap-3">
                                {["Onboarding flow for non-technical users", "Memory usage on 8GB RAM machines", "Editor typography preferences vs VS Code"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                        <CheckCircle size={18} className="text-slate-300 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
                            <div className="mb-4 sm:mb-0">
                                <h4 className="font-bold text-lg flex items-center gap-2"><Coins className="text-amber-400 fill-amber-400" /> Earn Coins & Reputation</h4>
                                <p className="text-indigo-100 text-sm opacity-90">Complete these structured tasks to help the builder. Quality matters.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold border border-white/20">
                                Your Wallet: 12 Coins
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2].map(i => (
                                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-400 hover:ring-1 hover:ring-indigo-400 transition-all shadow-sm group">
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge color="amber" className="flex items-center gap-1 px-2.5 py-1 text-sm bg-amber-100">
                                            <Coins size={14} className="fill-amber-500 text-amber-600" /> 3 Coins
                                        </Badge>
                                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                            <Clock size={12} /> 10m
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-2 text-lg">Test Windows Installer</h4>
                                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">Download the .exe and report any SmartScreen warnings. Screenshot required for proof.</p>
                                    <Button className="w-full justify-between group-hover:bg-indigo-700">
                                        Start Review <ArrowRight size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'comments' && (
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <div className="mb-8 flex gap-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs shadow-inner">ME</div>
                            <div className="flex-1">
                                <textarea placeholder="Add a quick comment or question..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none h-24 text-sm" />
                                <div className="flex justify-end mt-2">
                                    <Button className="py-1.5 px-4">Post Comment</Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-slate-400 text-xs border border-slate-200">
                                        R{i}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-sm text-slate-900">reviewer_{i}</span>
                                            <span className="text-xs text-slate-400">• 2h ago</span>
                                            {i === 1 && <Badge color="green" className="ml-2">Helpful</Badge>}
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">Great idea for privacy focused folks. Have you considered adding a dark mode toggle in the status bar? I found the light mode a bit harsh at night.</p>
                                        <div className="mt-3 flex gap-4 text-xs text-slate-500 font-medium">
                                            <button className="hover:text-indigo-600 flex items-center gap-1"><ThumbsUp size={12} /> Helpful (4)</button>
                                            <button className="hover:text-indigo-600">Reply</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'chat' && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-16 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <Lock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Locked Channel</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                            To prevent spam and ensure quality discussion, this chat is only open to users who have completed a <b>Serious Review</b> or have been invited by the builder.
                        </p>
                        <Button variant="outline" className="bg-white shadow-sm">Request Access</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
