import React from 'react';
import { Home, PlusCircle, Coins, Award, User, Hash, Menu } from 'lucide-react';
import { View, Channel, DM } from '../types';
import { CHANNELS, DMS } from '../data/mock';

interface SidebarProps {
    currentView: View;
    activeChatId: string;
    onViewChange: (view: View) => void;
    onChannelClick: (id: string) => void;
}

export const Sidebar = ({ currentView, activeChatId, onViewChange, onChannelClick }: SidebarProps) => {
    const mainNavItems = [
        { id: 'feed', label: 'Feed', icon: Home },
        { id: 'project_post', label: 'Post Project', icon: PlusCircle },
        { id: 'reviews', label: 'Coin Reviews', icon: Coins, badge: '12' },
        { id: 'reputation', label: 'Reputation', icon: Award },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    return (
        <aside className="w-64 border-r border-slate-200 flex flex-col bg-slate-50/50 hidden md:flex shrink-0">
            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900">
                    <div className="w-6 h-6 bg-indigo-600 rounded-md shadow-sm" />
                    Indie Club
                </h1>
            </div>

            <nav className="flex-1 px-4 overflow-y-auto space-y-6">
                {/* Main Navigation */}
                <div className="space-y-1">
                    {mainNavItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id as View)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentView === item.id
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                                    : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-slate-900'
                                }`}
                        >
                            <item.icon size={18} className={currentView === item.id ? 'stroke-[2.5px]' : ''} />
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                        </button>
                    ))}
                </div>

                {/* Channels Section */}
                <div>
                    <div className="flex items-center justify-between px-3 mb-2 text-slate-400 group cursor-pointer hover:text-slate-600">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Community</span>
                        <PlusCircle size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-0.5">
                        {CHANNELS.map(channel => (
                            <button
                                key={channel.id}
                                onClick={() => onChannelClick(channel.id)}
                                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${currentView === 'chat' && activeChatId === channel.id
                                        ? 'bg-indigo-100/50 text-indigo-700 font-medium'
                                        : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-900'
                                    }`}
                            >
                                <Hash size={16} className={channel.unread ? "text-slate-900" : "text-slate-400"} />
                                <span className={channel.unread ? "text-slate-900 font-medium" : ""}>{channel.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* DMs Section */}
                <div>
                    <div className="flex items-center justify-between px-3 mb-2 text-slate-400 group cursor-pointer hover:text-slate-600">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Direct Messages</span>
                        <PlusCircle size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-0.5">
                        {DMS.map(dm => (
                            <button
                                key={dm.id}
                                onClick={() => onChannelClick(dm.id)}
                                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${currentView === 'chat' && activeChatId === dm.id
                                        ? 'bg-indigo-100/50 text-indigo-700 font-medium'
                                        : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-900'
                                    }`}
                            >
                                <div className="relative">
                                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold">
                                        {dm.name.charAt(0).toUpperCase()}
                                    </div>
                                    {dm.status === 'online' && <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border-2 border-white"></div>}
                                </div>
                                <span>{dm.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="p-4 m-4 bg-white border border-slate-200 rounded-xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-transparent rounded-bl-full opacity-50 -mr-4 -mt-4 pointer-events-none" />
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wallet</span>
                    <button className="text-indigo-600 hover:underline text-[10px] font-bold">TOP UP</button>
                </div>
                <div className="text-2xl font-black text-slate-900 flex items-center gap-2 mb-3">
                    <Coins className="text-amber-500 fill-amber-500" size={20} /> 12
                </div>
            </div>
        </aside>
    );
};
