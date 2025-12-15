import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ProfileView = () => (
    <div className="max-w-3xl mx-auto pt-6 animate-in fade-in duration-300">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8 shadow-sm">
            <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-200"></div>
            <div className="px-8 pb-8">
                <div className="relative -top-12 mb-[-30px] flex justify-between items-end">
                    <div className="w-24 h-24 bg-white rounded-full p-1.5 border border-slate-200 shadow-sm">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white text-2xl font-bold">AB</div>
                    </div>
                    <Button variant="secondary">Edit Profile</Button>
                </div>
                <div className="mt-12">
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">Alex Builder <Badge color="indigo">Pro</Badge></h1>
                    <p className="text-slate-500">@alex_builds</p>
                </div>
                <p className="mt-4 text-slate-700 max-w-lg leading-relaxed">Full-stack developer loving React and Node.</p>
            </div>
        </div>
    </div>
);
