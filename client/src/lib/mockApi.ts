import { mockSessions, mockExercises, mockBookings, mockAnnouncements } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  sessions: {
    getAll: async () => {
      await delay(300);
      return mockSessions;
    },
    getById: async (id: string) => {
      await delay(200);
      return mockSessions.find(s => s.id === id);
    },
  },
  
  exercises: {
    getAll: async () => {
      await delay(300);
      return mockExercises;
    },
  },
  
  bookings: {
    getAll: async () => {
      await delay(300);
      const storedBookings = localStorage.getItem('demoBookings');
      return storedBookings ? JSON.parse(storedBookings) : mockBookings;
    },
    create: async (sessionId: string, sessionDate: Date) => {
      await delay(400);
      const session = mockSessions.find(s => s.id === sessionId);
      if (!session) throw new Error('Session not found');
      
      const newBooking = {
        id: `booking-${Date.now()}`,
        userId: 'user-1',
        sessionId,
        sessionDate,
        status: 'confirmed' as const,
        createdAt: new Date(),
        session,
      };
      
      const storedBookings = localStorage.getItem('demoBookings');
      const bookings = storedBookings ? JSON.parse(storedBookings) : mockBookings;
      const updatedBookings = [...bookings, newBooking];
      localStorage.setItem('demoBookings', JSON.stringify(updatedBookings));
      
      return newBooking;
    },
    cancel: async (id: string) => {
      await delay(300);
      const storedBookings = localStorage.getItem('demoBookings');
      const bookings = storedBookings ? JSON.parse(storedBookings) : mockBookings;
      const updatedBookings = bookings.filter((b: any) => b.id !== id);
      localStorage.setItem('demoBookings', JSON.stringify(updatedBookings));
    },
  },
  
  announcements: {
    getAll: async () => {
      await delay(200);
      return mockAnnouncements;
    },
  },
};
