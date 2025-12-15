import { Project, Review, Channel, DM } from '../types';

export const PROJECTS: Project[] = [
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

export const REVIEWS: Review[] = [
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

export const CHANNELS: Channel[] = [
    { id: 'global', name: 'global-builders', type: 'public', unread: true },
    { id: 'announcements', name: 'announcements', type: 'public', unread: false },
    { id: 'resources', name: 'resources', type: 'public', unread: false },
];

export const DMS: DM[] = [
    { id: 'sarah', name: 'sarah_codes', status: 'online', unread: false },
    { id: 'alex', name: 'alex_builds', status: 'offline', unread: true },
];
