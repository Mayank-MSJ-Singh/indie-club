# Indie Club

## Project Overview

Indie Club is a community platform for independent developers.

The core problem:
Most indie developers build alone. They struggle to get timely, honest feedback, early users, and meaningful peer connections.

Indie Club solves this by combining:

* an open community feed (free, low-friction feedback)
* an incentive layer (coins for intentional reviews)
* a trust layer (reputation)
* controlled social interaction (intro-based personal chat)

This is not a Discord clone.
This is not a Reddit clone.
It is a focused builder network with intent.

---

## Core Principles

1. Open by default
2. Incentives only where needed
3. Reputation over currency
4. Intentional interactions > noise
5. Enforce quality through systems, not moderation drama

If a feature increases spam or low-effort behavior, it is wrong.

---

## Product Structure

The product is split into three logical layers.

### 1. Open Community Layer

* Anyone can post a project
* Anyone can comment
* No coins required
* Encourages activity and discovery

### 2. Intentional Feedback Layer

* Coin-backed serious reviews
* Builder defines expectations
* Reviewer earns coins only if feedback is useful
* Structured, effort-based

### 3. Trust & Connection Layer

* Reputation system
* Intro-based personal chat
* No open DMs
* Prevents spam by design

---

## User Roles

There are no strict roles.

A user can be:

* a builder (posting projects)
* a reviewer (earning coins)
* both (most users)

Permissions emerge from reputation, not labels.

---

## Coins System (Utility Only)

Coins are internal.
They are not crypto.
They are not tradable.

Purpose of coins:

* Signal intent
* Reward effort
* Prevent spam

Coins are used for:

* Requesting serious feedback
* Sending personal chat intros

Coins are earned when:

* A builder marks a review as useful
* A review is marked as high quality (bonus, rare)

Coins are not guaranteed.
Effort does not equal reward. Value does.

---

## Reputation System (Backbone)

Reputation is long-term.
Coins are short-term.

Reputation increases when:

* Reviews are consistently marked useful
* Feedback quality is high
* Intros are accepted
* Account ages naturally

Reputation decreases when:

* Reviews are repeatedly low quality
* Spam or abuse is detected

Reputation affects:

* Daily limits
* Visibility
* Trust signals
* Access to features

UI must always emphasize reputation over coins.

---

## Posting & Feedback Flow

### Open Post

* Builder posts project
* Community comments freely
* Short feedback
* No coins involved

### Serious Review

* Builder opts in
* Defines task, time expectation, coin reward
* Reviewer completes task
* Builder marks outcome
* System handles coins and reputation automatically

Abuse is handled via pattern detection, not arguments.

---

## Chat System

### Project Chat

* Per project
* Purpose-driven
* Locked by default
* Unlocked by completing a serious review or builder approval

### Personal Chat

* No open DMs
* Intro-based system
* Sending intro costs 1 coin
* If accepted → coin refunded
* If rejected → coin burned

Spam is economically impossible.

---

## UI Philosophy

* Reddit-style structure for content
* Discord-like feel only where necessary
* No global noisy chat
* Calm, professional, builder-first

A new user should understand the product in under 30 seconds.

---

## Tech Stack (Final)

Frontend:

* Vite
* React
* TypeScript
* Client-side rendering (CSR)

Backend:

* Python
* Flask
* Gunicorn

Database:

* PostgreSQL

Infrastructure:

* Docker
* Docker Compose
* Nginx (reverse proxy)
* Single VPS (initial phase)

---

## Routing Strategy

Nginx handles:

* `/` → frontend (static build)
* `/api/*` → Flask backend

Frontend never connects directly to backend ports.

---

## Backend Expectations

The backend is the source of truth.

Responsibilities:

* Enforce coin logic
* Enforce reputation changes
* Validate permissions
* Rate-limit sensitive actions
* Detect abuse patterns

Frontend handles UX.
Backend enforces rules.

---

## Frontend Example Code (Reference UI)

The following code represents a **finalized UI direction and interaction model**.

It is:

* not production-ready
* not fully wired
* intentionally mock-data driven

Its purpose:

* communicate structure
* communicate UX intent
* guide implementation

Do not treat this as final logic.

```
import React, { useState } from 'react';
import { 
  Home, 
  PlusCircle, 
  Coins, 
  MessageSquare, 
  Award, 
  User, 
  ThumbsUp, 
  MessageCircle, 
  Search, 
  Filter, 
  Lock, 
  CheckCircle, 
  ArrowRight, 
  Github, 
  Twitter, 
  Globe, 
  Send,
  Menu,
  X,
  Clock,
  Briefcase,
  Hash, // Icon for text channels
  Volume2, // Icon for voice (optional visual)
  MoreHorizontal,
  Settings,
  ChevronDown
} from 'lucide-react';

// --- Types & Mock Data ---

type View = 'landing' | 'feed' | 'project' | 'reviews' | 'chat' | 'reputation' | 'profile';

interface Project {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  author: string;
  reputation: number;
  likes: number;
  comments: number;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Zenith AI Writer",
    desc: "A distraction-free writing environment that uses local LLMs to auto-complete your sentences without sending data to the cloud.",
    tags: ["AI", "SaaS", "Desktop"],
    author: "alex_builds",
    reputation: 450,
    likes: 124,
    comments: 45
  },
  {
    id: 2,
    title: "DevDash",
    desc: "All your CI/CD pipelines, analytics, and error logs in one customizable browser new-tab page.",
    tags: ["DevTools", "Web"],
    author: "sarah_codes",
    reputation: 890,
    likes: 89,
    comments: 12
  },
  {
    id: 3,
    title: "HabitLoop",
    desc: "Social habit tracker that allows you to wager coins on your streaks. Lose your streak, lose your coins to the community pool.",
    tags: ["Mobile", "Health"],
    author: "gym_rat_99",
    reputation: 120,
    likes: 230,
    comments: 67
  }
];

const REVIEWS = [
  {
    id: 1,
    project: "Zenith AI Writer",
    task: "Test the onboarding flow on Windows",
    reward: 3,
    time: "10 min",
    category: "UX Testing"
  },
  {
    id: 2,
    project: "HabitLoop",
    task: "Verify strict mode payment gateway",
    reward: 5,
    time: "15 min",
    category: "Bug Hunt"
  },
  {
    id: 3,
    project: "DevDash",
    task: "Feedback on color contrast for dark mode",
    reward: 1,
    time: "5 min",
    category: "Design"
  }
];

const CHANNELS = [
  { id: 'global', name: 'global-builders', type: 'public', unread: true },
  { id: 'announcements', name: 'announcements', type: 'public', unread: false },
  { id: 'resources', name: 'resources', type: 'public', unread: false },
];

const DMS = [
  { id: 'sarah', name: 'sarah_codes', status: 'online', unread: false },
  { id: 'alex', name: 'alex_builds', status: 'offline', unread: true },
];

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }: any) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md active:scale-95",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    outline: "border-2 border-slate-900 text-slate-900 hover:bg-slate-50"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ children, color = 'slate', className = '' }: any) => {
  const colors = {
    slate: "bg-slate-100 text-slate-700",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100"
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${colors[color as keyof typeof colors]} ${className}`}>
      {children}
    </span>
  );
};

// --- Views ---

const LandingPage = ({ onLogin }: { onLogin: () => void }) => (
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

const FeedView = ({ onOpenProject }: { onOpenProject: (id: number) => void }) => (
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

const ProjectView = ({ projectId, onBack }: { projectId: number, onBack: () => void }) => {
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
             <Badge color="green" className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Live Beta</Badge>
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
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Briefcase size={18} className="text-indigo-600"/> The Pitch</h3>
              <p className="text-slate-600 leading-7">
                Zenith is designed to keep you in the flow state. Unlike other AI writers that require cloud connectivity, Zenith runs a quantized LLaMA model locally on your machine. This means zero latency, total privacy, and offline capability. It's built with Rust and Tauri for maximum performance.
              </p>
            </section>
            <div className="h-px bg-slate-100 w-full" />
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MessageSquare size={18} className="text-indigo-600"/> Needed Feedback</h3>
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
                    <h4 className="font-bold text-lg flex items-center gap-2"><Coins className="text-amber-400 fill-amber-400"/> Earn Coins & Reputation</h4>
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
                                <Clock size={12}/> 10m
                            </span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 text-lg">Test Windows Installer</h4>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">Download the .exe and report any SmartScreen warnings. Screenshot required for proof.</p>
                        <Button className="w-full justify-between group-hover:bg-indigo-700">
                            Start Review <ArrowRight size={16}/>
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
                             <button className="hover:text-indigo-600 flex items-center gap-1"><ThumbsUp size={12}/> Helpful (4)</button>
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

const CoinReviewsView = () => (
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
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Clock size={12}/> {review.time} est.</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Simplified Chat Interface (controlled by Sidebar)
const ChatInterface = ({ activeChatId }: { activeChatId: string }) => {
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
                     <Volume2 className="hover:text-slate-700 cursor-pointer" size={20}/>
                     <Settings className="hover:text-slate-700 cursor-pointer" size={20}/>
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
                        <PlusCircle size={16}/>
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

const ReputationView = () => (
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

const ProfileView = () => (
    <div className="max-w-3xl mx-auto pt-6 animate-in fade-in duration-300">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8 shadow-sm">
             <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-200"></div>
             {/* ...existing profile code... (simplified for brevity in this specific render if needed, but keeping full for correctness) */}
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

// --- Main App Shell ---

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

  // Sidebar Sections
  const mainNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'project_post', label: 'Post Project', icon: PlusCircle }, 
    { id: 'reviews', label: 'Coin Reviews', icon: Coins, badge: '12' },
    { id: 'reputation', label: 'Reputation', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
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
                onClick={() => handleViewChange(item.id as View)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.id 
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
               <PlusCircle size={12} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
            </div>
            <div className="space-y-0.5">
               {CHANNELS.map(channel => (
                 <button
                    key={channel.id}
                    onClick={() => handleChannelClick(channel.id)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                       currentView === 'chat' && activeChatId === channel.id
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
               <PlusCircle size={12} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
            </div>
             <div className="space-y-0.5">
               {DMS.map(dm => (
                 <button
                    key={dm.id}
                    onClick={() => handleChannelClick(dm.id)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                       currentView === 'chat' && activeChatId === dm.id
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
```

---

## MVP Scope (Strict)

MVP includes:

* Authentication
* Project feed
* Project page
* Comments
* Serious reviews with coins
* Reputation (basic)
* Docker + Nginx deployment

MVP excludes:

* Global chat
* Notifications
* Dark mode
* Mobile app
* Advanced analytics

Ship first. Iterate later.

---

## What This Project Is Not

* Not social media
* Not crypto
* Not a Discord clone
* Not an experiment playground

It is a serious tool for builders.

---

## Long-Term Direction (Non-binding)

If successful:

* Reputation becomes developer identity
* Profiles become lightweight portfolios
* Trust graph emerges naturally

None of this matters until v1 works.

---

## Final Principle

Quality beats scale.
Intent beats noise.
Builders beat metrics.

If a feature violates this, remove it.
