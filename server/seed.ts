import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");

  // Create test users
  const adminUser = await storage.createUser({
    username: "admin",
    password: "admin123",
    email: "admin@sarvaswasthyam.com",
    role: "admin",
    fullName: "Admin User",
  });

  const testUser = await storage.createUser({
    username: "user",
    password: "user123",
    email: "user@sarvaswasthyam.com",
    role: "user",
    fullName: "Test User",
  });

  console.log("✓ Created users");

  // Create yoga sessions
  const sessions = [
    {
      title: "Morning Hatha Yoga",
      description: "Start your day with energizing Hatha yoga poses",
      instructor: "Priya Sharma",
      category: "Hatha",
      level: "Beginner",
      duration: 60,
      maxParticipants: 15,
      price: 25,
      schedule: "Mon, Wed, Fri 7AM",
      imageUrl: "/images/hatha.jpg",
    },
    {
      title: "Mindful Meditation",
      description: "Find inner peace through guided meditation",
      instructor: "Arjun Patel",
      category: "Meditation",
      level: "All Levels",
      duration: 45,
      maxParticipants: 20,
      price: 20,
      schedule: "Daily 6PM",
      imageUrl: "/images/meditation.jpg",
    },
    {
      title: "Power Vinyasa Flow",
      description: "Dynamic flowing sequences for strength and flexibility",
      instructor: "Maya Singh",
      category: "Vinyasa",
      level: "Advanced",
      duration: 75,
      maxParticipants: 15,
      price: 35,
      schedule: "Tue, Thu 8AM",
      imageUrl: "/images/vinyasa.jpg",
    },
    {
      title: "Restorative Yoga",
      description: "Gentle poses for deep relaxation and stress relief",
      instructor: "Priya Sharma",
      category: "Restorative",
      level: "Beginner",
      duration: 60,
      maxParticipants: 12,
      price: 28,
      schedule: "Wed, Sat 5PM",
      imageUrl: "/images/restorative.jpg",
    },
    {
      title: "Ashtanga Primary Series",
      description: "Traditional Ashtanga sequence for building discipline",
      instructor: "Raj Kumar",
      category: "Ashtanga",
      level: "Intermediate",
      duration: 90,
      maxParticipants: 12,
      price: 40,
      schedule: "Mon, Thu 6AM",
      imageUrl: "/images/ashtanga.jpg",
    },
    {
      title: "Yin Yoga & Breathwork",
      description: "Deep stretches combined with conscious breathing",
      instructor: "Ananya Reddy",
      category: "Yin",
      level: "All Levels",
      duration: 75,
      maxParticipants: 15,
      price: 30,
      schedule: "Tue, Fri 7PM",
      imageUrl: "/images/yin.jpg",
    },
  ];

  for (const sessionData of sessions) {
    await storage.createSession(sessionData);
  }

  console.log("✓ Created yoga sessions");

  // Create exercises
  const exercises = [
    {
      title: "Sun Salutation Flow",
      description: "Learn the classic sun salutation sequence for morning energy and vitality",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 15,
      level: "Beginner",
      category: "Vinyasa",
      thumbnailUrl: "/images/sun-salutation.jpg",
    },
    {
      title: "Warrior Pose Series",
      description: "Build strength and stability with warrior pose variations",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 20,
      level: "Intermediate",
      category: "Strength",
      thumbnailUrl: "/images/warrior.jpg",
    },
    {
      title: "Deep Relaxation & Savasana",
      description: "Master the art of deep relaxation and conscious rest",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 12,
      level: "Beginner",
      category: "Relaxation",
      thumbnailUrl: "/images/savasana.jpg",
    },
    {
      title: "Core Strengthening Flow",
      description: "Develop core strength through dynamic yoga movements",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 25,
      level: "Advanced",
      category: "Strength",
      thumbnailUrl: "/images/core.jpg",
    },
    {
      title: "Breathing Techniques (Pranayama)",
      description: "Master essential breathing techniques for energy and calm",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 18,
      level: "Beginner",
      category: "Breathwork",
      thumbnailUrl: "/images/pranayama.jpg",
    },
    {
      title: "Balance & Inversions",
      description: "Challenge yourself with advanced balancing poses and inversions",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 30,
      level: "Advanced",
      category: "Balance",
      thumbnailUrl: "/images/inversions.jpg",
    },
  ];

  for (const exerciseData of exercises) {
    await storage.createExercise(exerciseData);
  }

  console.log("✓ Created exercises");

  // Create announcement
  await storage.createAnnouncement({
    title: "Welcome to Sarvaswasthyam",
    content: "Join us for our grand opening week with special discounted rates on all sessions!",
    authorId: adminUser.id,
  });

  console.log("✓ Created announcement");
  console.log("\nSeed completed successfully!");
  console.log("\nTest credentials:");
  console.log("Admin - username: admin, password: admin123");
  console.log("User - username: user, password: user123");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
