import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertSessionSchema, updateSessionSchema, insertBookingSchema, insertExerciseSchema, insertAnnouncementSchema } from "@shared/schema";
import { z } from "zod";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      
      // Store user in session
      if (req.session) {
        req.session.userId = user.id;
      }
      
      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role,
        fullName: user.fullName 
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = await storage.verifyPassword(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Store user in session
      if (req.session) {
        req.session.userId = user.id;
      }
      
      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role,
        fullName: user.fullName 
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    if (req.session) {
      req.session.destroy((err: any) => {
        if (err) {
          return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ success: true });
      });
    } else {
      res.json({ success: true });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      id: user.id, 
      username: user.username, 
      email: user.email,
      role: user.role,
      fullName: user.fullName 
    });
  });

  // Session routes
  app.get("/api/sessions", async (req, res) => {
    try {
      const sessions = await storage.getSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch session" });
    }
  });

  app.post("/api/sessions", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const sessionData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(sessionData);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const session = await storage.updateSession(req.params.id, req.body);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Failed to update session" });
    }
  });

  app.delete("/api/sessions/:id", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const deleted = await storage.deleteSession(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete session" });
    }
  });

  // Booking routes
  app.get("/api/bookings", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role === 'admin') {
        const bookings = await storage.getBookings();
        res.json(bookings);
      } else {
        const bookings = await storage.getBookingsByUser(req.session.userId);
        res.json(bookings);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId: req.session.userId
      });

      const booking = await storage.createBooking(bookingData);
      
      // Update session participant count
      const yogaSession = await storage.getSession(booking.sessionId);
      if (yogaSession) {
        await storage.updateSession(booking.sessionId, {
          currentParticipants: yogaSession.currentParticipants + 1
        });
      }

      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      const user = await storage.getUser(req.session.userId);
      if (booking.userId !== req.session.userId && user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const deleted = await storage.deleteBooking(req.params.id);
      
      // Update session participant count
      const yogaSession = await storage.getSession(booking.sessionId);
      if (yogaSession && yogaSession.currentParticipants > 0) {
        await storage.updateSession(booking.sessionId, {
          currentParticipants: yogaSession.currentParticipants - 1
        });
      }

      res.json({ success: deleted });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });

  // Exercise routes
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getExercises();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });

  app.post("/api/exercises", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const exerciseData = insertExerciseSchema.parse(req.body);
      const exercise = await storage.createExercise(exerciseData);
      res.json(exercise);
    } catch (error) {
      res.status(400).json({ error: "Invalid exercise data" });
    }
  });

  app.delete("/api/exercises/:id", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const deleted = await storage.deleteExercise(req.params.id);
      res.json({ success: deleted });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete exercise" });
    }
  });

  // Announcement routes
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  app.post("/api/announcements", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const announcementData = insertAnnouncementSchema.parse({
        ...req.body,
        authorId: req.session.userId
      });

      const announcement = await storage.createAnnouncement(announcementData);
      res.json(announcement);
    } catch (error) {
      res.status(400).json({ error: "Invalid announcement data" });
    }
  });

  app.delete("/api/announcements/:id", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (user?.role !== 'admin') {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const deleted = await storage.deleteAnnouncement(req.params.id);
      res.json({ success: deleted });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete announcement" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
