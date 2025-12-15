import { useState } from 'react';
import { Menu } from 'lucide-react';
import { View } from './types';
import { Sidebar } from './layouts/Sidebar';
import { LandingPage } from './views/LandingPage';
import { FeedView } from './views/FeedView';
import { ProjectView } from './views/ProjectView';
import { CoinReviewsView } from './views/CoinReviewsView';
import { ChatInterface } from './views/ChatInterface';
import { ReputationView } from './views/ReputationView';
import { ProfileView } from './views/ProfileView';

export default function IndieClub() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('feed');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>('global');

  // Navigation handlers
  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleProjectClick = (id: number) => {
    setSelectedProjectId(id);
    setCurrentView('project');
  };

  const handleChannelClick = (id: string) => {
    setActiveChatId(id);
    setCurrentView('chat');
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        activeChatId={activeChatId}
        onViewChange={handleViewChange}
        onChannelClick={handleChannelClick}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-slate-200 flex items-center justify-between px-4 bg-white z-10 shrink-0">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-5 h-5 bg-indigo-600 rounded" />
            Indie Club
          </div>
          <button className="p-2 text-slate-600"><Menu size={24} /></button>
        </header>

        {/* Dynamic Content Area */}
        <div className={`flex-1 overflow-hidden relative ${currentView === 'chat' ? 'bg-white' : 'overflow-y-auto p-4 md:p-8 md:px-12 scroll-smooth'}`}>
          {currentView === 'feed' && <FeedView onOpenProject={handleProjectClick} />}
          {currentView === 'project' && selectedProjectId && <ProjectView projectId={selectedProjectId} onBack={() => handleViewChange('feed')} />}
          {currentView === 'reviews' && <CoinReviewsView />}
          {currentView === 'chat' && <ChatInterface activeChatId={activeChatId} />}
          {currentView === 'reputation' && <ReputationView />}
          {currentView === 'profile' && <ProfileView />}
        </div>
      </main>
    </div>
  );
}
