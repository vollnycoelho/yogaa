import { 
  type User, 
  type InsertUser,
  type Session,
  type InsertSession,
  type Booking,
  type InsertBooking,
  type Exercise,
  type InsertExercise,
  type Announcement,
  type InsertAnnouncement
} from "@shared/schema";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
  
  // Session methods
  getSessions(): Promise<Session[]>;
  getSession(id: string): Promise<Session | undefined>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: string, session: Partial<Omit<Session, 'id'>>): Promise<Session | undefined>;
  deleteSession(id: string): Promise<boolean>;
  
  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  deleteBooking(id: string): Promise<boolean>;
  
  // Exercise methods
  getExercises(): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExercise(id: string, exercise: Partial<InsertExercise>): Promise<Exercise | undefined>;
  deleteExercise(id: string): Promise<boolean>;
  
  // Announcement methods
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  deleteAnnouncement(id: string): Promise<boolean>;
}

// In-memory storage implementation
export class InMemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private bookings: Map<string, Booking> = new Map();
  private exercises: Map<string, Exercise> = new Map();
  private announcements: Map<string, Announcement> = new Map();

  constructor() {
    this.seedData();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async seedData() {
    // Create demo admin user
    const adminId = this.generateId();
    const adminPassword = await bcrypt.hash("admin123", 10);
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      email: "admin@yoga.com",
      password: adminPassword,
      role: "admin",
      fullName: "Admin User",
      createdAt: new Date(),
    });

    // Create demo regular user
    const userId = this.generateId();
    const userPassword = await bcrypt.hash("user123", 10);
    this.users.set(userId, {
      id: userId,
      username: "user",
      email: "user@yoga.com",
      password: userPassword,
      role: "user",
      fullName: "Demo User",
      createdAt: new Date(),
    });

    // Create demo sessions
    const session1Id = this.generateId();
    this.sessions.set(session1Id, {
      id: session1Id,
      title: "Morning Vinyasa Flow",
      description: "Start your day with an energizing vinyasa flow practice",
      instructor: "Sarah Johnson",
      category: "Vinyasa",
      level: "Intermediate",
      duration: 60,
      maxParticipants: 20,
      currentParticipants: 8,
      price: 800,
      schedule: "Mon, Wed, Fri - 7:00 AM",
      imageUrl: "",
      createdAt: new Date(),
    });

    const session2Id = this.generateId();
    this.sessions.set(session2Id, {
      id: session2Id,
      title: "Gentle Hatha Yoga",
      description: "A gentle practice suitable for all levels",
      instructor: "Mike Chen",
      category: "Hatha",
      level: "Beginner",
      duration: 60,
      maxParticipants: 15,
      currentParticipants: 5,
      price: 600,
      schedule: "Tue, Thu - 10:00 AM",
      imageUrl: "",
      createdAt: new Date(),
    });

    const session3Id = this.generateId();
    this.sessions.set(session3Id, {
      id: session3Id,
      title: "Power Yoga",
      description: "High-intensity yoga for strength and stamina",
      instructor: "Emma Davis",
      category: "Vinyasa",
      level: "Advanced",
      duration: 60,
      maxParticipants: 12,
      currentParticipants: 3,
      price: 1000,
      schedule: "Mon, Wed - 6:00 PM",
      imageUrl: "",
      createdAt: new Date(),
    });

    // Create demo exercises
    const exercise1Id = this.generateId();
    this.exercises.set(exercise1Id, {
      id: exercise1Id,
      name: "Downward Dog",
      description: "A foundational pose that stretches and strengthens the body",
      category: "strength",
      difficulty: "beginner",
      duration: 60,
      videoUrl: "https://example.com/downward-dog",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
      createdAt: new Date(),
    });

    const exercise2Id = this.generateId();
    this.exercises.set(exercise2Id, {
      id: exercise2Id,
      name: "Warrior II",
      description: "Build strength and stability in the legs and core",
      category: "strength",
      difficulty: "intermediate",
      duration: 45,
      videoUrl: "https://example.com/warrior-2",
      imageUrl: "https://images.unsplash.com/photo-1588286840104-8957b019727f",
      createdAt: new Date(),
    });

    // Create demo announcements
    const announcement1Id = this.generateId();
    this.announcements.set(announcement1Id, {
      id: announcement1Id,
      title: "Welcome to Our Yoga Studio!",
      content: "We're excited to have you join our community. Check out our class schedule and book your first session today!",
      authorId: adminId,
      createdAt: new Date(),
    });

    const announcement2Id = this.generateId();
    this.announcements.set(announcement2Id, {
      id: announcement2Id,
      title: "New Advanced Classes Added",
      content: "We've added new advanced level classes for experienced practitioners. Book now to secure your spot!",
      authorId: adminId,
      createdAt: new Date(),
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.generateId();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = {
      id,
      ...insertUser,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Session methods
  async getSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values());
  }

  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.generateId();
    const session: Session = {
      id,
      ...insertSession,
      currentParticipants: 0,
      createdAt: new Date(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: string, updateData: Partial<Omit<Session, 'id'>>): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updateData };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async deleteSession(id: string): Promise<boolean> {
    return this.sessions.delete(id);
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(b => b.userId === userId);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.generateId();
    const booking: Booking = {
      id,
      ...insertBooking,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: string, updateData: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, ...updateData };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }

  // Exercise methods
  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = this.generateId();
    const exercise: Exercise = {
      id,
      ...insertExercise,
      createdAt: new Date(),
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async updateExercise(id: string, updateData: Partial<InsertExercise>): Promise<Exercise | undefined> {
    const exercise = this.exercises.get(id);
    if (!exercise) return undefined;
    
    const updatedExercise = { ...exercise, ...updateData };
    this.exercises.set(id, updatedExercise);
    return updatedExercise;
  }

  async deleteExercise(id: string): Promise<boolean> {
    return this.exercises.delete(id);
  }

  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = this.generateId();
    const announcement: Announcement = {
      id,
      ...insertAnnouncement,
      createdAt: new Date(),
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    return this.announcements.delete(id);
  }
}

export const storage = new InMemoryStorage();