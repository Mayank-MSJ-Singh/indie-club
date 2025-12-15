
export type View = 'landing' | 'feed' | 'project' | 'reviews' | 'chat' | 'reputation' | 'profile';

export interface Project {
    id: number;
    title: string;
    desc: string;
    tags: string[];
    author: string;
    reputation: number;
    likes: number;
    comments: number;
}

export interface Review {
    id: number;
    project: string;
    task: string;
    reward: number;
    time: string;
    category: string;
}

export interface Channel {
    id: string;
    name: string;
    type: 'public' | 'private';
    unread: boolean;
}

export interface DM {
    id: string;
    name: string;
    status: 'online' | 'offline';
    unread: boolean;
}
