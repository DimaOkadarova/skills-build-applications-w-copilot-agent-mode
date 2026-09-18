import { connectDatabase, mongoose } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        profile: { age: 29, fitnessLevel: 'intermediate', goals: ['build strength', 'run a 10K'] },
      },
      {
        name: 'Jordan Williams',
        email: 'jordan.williams@example.com',
        profile: { age: 34, fitnessLevel: 'advanced', goals: ['improve endurance', 'train consistently'] },
      },
      {
        name: 'Sam Rivera',
        email: 'sam.rivera@example.com',
        profile: { age: 26, fitnessLevel: 'beginner', goals: ['create a routine', 'increase mobility'] },
      },
    ]);

    const teams = await Team.create([
      {
        name: 'Morning Movers',
        description: 'A friendly team for consistent weekday workouts.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Peak Performers',
        description: 'Training together to improve speed and endurance.',
        members: [users[1]._id],
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'strength training', durationMinutes: 45, calories: 320, completedAt: new Date('2026-09-15T07:00:00Z') },
      { user: users[1]._id, type: 'running', durationMinutes: 52, calories: 610, completedAt: new Date('2026-09-16T06:30:00Z') },
      { user: users[2]._id, type: 'yoga', durationMinutes: 30, calories: 140, completedAt: new Date('2026-09-17T18:00:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[1]._id, points: 1240, rank: 1, period: 'September 2026' },
      { user: users[0]._id, points: 980, rank: 2, period: 'September 2026' },
      { user: users[2]._id, points: 540, rank: 3, period: 'September 2026' },
    ]);

    await Workout.create([
      {
        name: 'Full-Body Foundation',
        description: 'A balanced strength session for building a consistent base.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['bodyweight squats', 'incline push-ups', 'dead bugs', 'glute bridges'],
      },
      {
        name: 'Tempo Run Builder',
        description: 'A focused interval workout for improving running pace.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['warm-up jog', 'tempo intervals', 'walking recovery', 'cool-down'],
      },
      {
        name: 'Athlete Conditioning',
        description: 'A challenging circuit combining power, agility, and stamina.',
        difficulty: 'advanced',
        durationMinutes: 50,
        exercises: ['kettlebell swings', 'burpees', 'skater jumps', 'mountain climbers'],
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
