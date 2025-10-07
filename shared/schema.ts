import { z } from "zod";

// User types and schemas
export const insertUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email(),
  fullName: z.string().optional(),
  role: z.enum(["user", "admin"]).default("user"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export interface User extends InsertUser {
  id: string;
  createdAt: Date;
}

// Session types and schemas
export const insertSessionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  instructor: z.string().min(1),
  category: z.string().min(1),
  level: z.string().min(1),
  duration: z.number().int().positive(),
  maxParticipants: z.number().int().positive(),
  price: z.number().positive(),
  schedule: z.string().min(1),
  imageUrl: z.string().optional(),
});

export const updateSessionSchema = insertSessionSchema.partial();

export type InsertSession = z.infer<typeof insertSessionSchema>;

export interface Session extends InsertSession {
  id: string;
  currentParticipants: number;
  createdAt: Date;
}

// Booking types and schemas
export const insertBookingSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  sessionDate: z.string(),
  status: z.enum(["confirmed", "cancelled", "completed"]).default("confirmed"),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;

export interface Booking extends InsertBooking {
  id: string;
  createdAt: Date;
}

// Exercise types and schemas
export const insertExerciseSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["flexibility", "strength", "balance", "relaxation"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  duration: z.number().int().positive(),
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
});

export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export interface Exercise extends InsertExercise {
  id: string;
  createdAt: Date;
}

// Announcement types and schemas
export const insertAnnouncementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  authorId: z.string(),
});

export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export interface Announcement extends InsertAnnouncement {
  id: string;
  createdAt: Date;
}