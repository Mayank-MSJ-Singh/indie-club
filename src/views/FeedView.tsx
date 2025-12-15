import React from 'react';
import { User, Award, ThumbsUp, MessageCircle, Coins } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PROJECTS } from '../data/mock';

export const FeedView = ({ onOpenProject }: { onOpenProject: (id: number) => void }) => (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Discover</h2>
            <div className="flex gap-1 text-sm text-slate-500 bg-slate-100 p-1 rounded-lg">
                <button className="px-3 py-1 bg-white shadow-sm rounded-md text-slate-900 font-medium transition-all">Hot</button>
                <button className="px-3 py-1 hover:text-slate-900 transition-all">New</button>
                <button className="px-3 py-1 hover:text-slate-900 transition-all">Top</button>
            </div>
        </div>

        {PROJECTS.map(project => (
            <div key={project.id} className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition-all cursor-pointer hover:shadow-md" onClick={() => onOpenProject(project.id)}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                        {project.tags.map(tag => (
                            <Badge key={tag} color="indigo">{tag}</Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                        <User size={12} />
                        {project.author}
                        <span className="text-amber-500 flex items-center gap-0.5">• {project.reputation} <Award size={10} /></span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                <p className="text-slate-600 mb-5 line-clamp-2 leading-relaxed">{project.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex gap-6">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">
                            <ThumbsUp size={16} />
                            {project.likes}
                        </button>
                        <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">
                            <MessageCircle size={16} />
                            {project.comments}
                        </button>
                    </div>
                    <Button variant="secondary" className="!py-1.5 !px-3 text-xs !border-indigo-100 !text-indigo-700 hover:!bg-indigo-50">
                        <Coins size={14} className="text-amber-500" />
                        Review for Coins
                    </Button>
                </div>
            </div>
        ))}
    </div>
);
