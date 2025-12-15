import React from 'react';
import { Hash, Volume2, Settings, MessageSquare, PlusCircle, Send } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { CHANNELS } from '../data/mock';

export const ChatInterface = ({ activeChatId }: { activeChatId: string }) => {
    // Mock logic to determine chat type based on ID
    const isGlobal = activeChatId === 'global' || activeChatId === 'announcements' || activeChatId === 'resources';
    const activeChannel = CHANNELS.find(c => c.id === activeChatId) || { name: activeChatId, type: 'public' };

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center h-16 shrink-0">
                <div className="flex items-center gap-2">
                    <Hash size={20} className="text-slate-400" />
                    <h3 className="font-bold text-slate-900 text-lg">{activeChannel.name}</h3>
                    {isGlobal && <Badge color="indigo" className="ml-2">Public</Badge>}
                </div>
                <div className="flex gap-2 text-slate-400">
                    <Volume2 className="hover:text-slate-700 cursor-pointer" size={20} />
                    <Settings className="hover:text-slate-700 cursor-pointer" size={20} />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="flex justify-center mb-8">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wide">Start of {activeChannel.name}</span>
                </div>

                {/* Mock Messages based on channel */}
                {activeChatId === 'global' ? (
                    <>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-purple-700">D</div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="font-bold text-slate-900">dev_dave</span>
                                    <span className="text-xs text-slate-400">10:42 AM</span>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">Has anyone tried the new Stripe payment element? Is it worth the migration?</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-indigo-700">ME</div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="font-bold text-slate-900">Alex Builder</span>
                                    <span className="text-xs text-slate-400">10:45 AM</span>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">Yeah, I just switched. The conversion rate bump is real. Took about 2 hours to implement. <span className="text-indigo-600 cursor-pointer hover:underline">@dev_dave</span> make sure you check the webhook versioning.</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                        <MessageSquare size={48} className="mb-4" />
                        <p>This is the start of the #{activeChatId} channel.</p>
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="p-4 px-6 border-t border-slate-200">
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded text-slate-400">
                        <PlusCircle size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder={`Message #${activeChannel.name}`}
                        className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm shadow-inner"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
