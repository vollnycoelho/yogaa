export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  fullName?: string | null;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  schedule: string;
  imageUrl?: string | null;
  createdAt?: string;
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  sessionDate: string;
  status: 'confirmed' | 'cancelled';
  createdAt?: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  duration: number;
  difficulty: string;
  category: string;
  thumbnailUrl?: string | null;
  createdAt?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt?: string;
}
