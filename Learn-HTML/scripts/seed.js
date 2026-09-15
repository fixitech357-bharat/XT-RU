/**
 * MongoDB Atlas Seeder Script for HTML Master LMS
 * Database: html_master_lms
 */

const { MongoClient } = require("mongodb");
const path = require("path");

// Mock browser window namespace for data files
global.window = {};

// Load data files
require(path.join(__dirname, "../js/data/topics.js"));
require(path.join(__dirname, "../js/data/exam.js"));
require(path.join(__dirname, "../js/data/cheatsheet.js"));
require(path.join(__dirname, "../js/data/achievements.js"));
require(path.join(__dirname, "../js/data/challenges.js"));

const MONGO_URI = "mongodb+srv://fixitech357_db_user:Hindi-LMS@cluster0.pungepi.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "html_master_lms";

async function seedDatabase() {
  console.log("Connecting to MongoDB Atlas Cluster...");
  const client = new MongoClient(MONGO_URI, {
    connectTimeoutMS: 15000,
    socketTimeoutMS: 30000
  });

  try {
    await client.connect();
    console.log("✓ Connected successfully to MongoDB Atlas!");

    const db = client.db(DB_NAME);
    console.log(`Using Database: ${DB_NAME}`);

    // 1. Seed Tracks & Topics
    const rawTopicsData = window.HTMLMaster.data.TOPICS;
    const tracksList = [];
    const topicsList = [];

    Object.entries(rawTopicsData).forEach(([trackKey, trackObj], index) => {
      tracksList.push({
        trackId: trackKey,
        order: index + 1,
        name: trackObj.name,
        icon: trackObj.icon,
        desc: trackObj.desc,
        topicCount: trackObj.topics.length,
        createdAt: new Date()
      });

      trackObj.topics.forEach((topic, tIdx) => {
        topicsList.push({
          topicId: topic.id,
          trackId: trackKey,
          trackName: trackObj.name,
          order: tIdx + 1,
          title: topic.title,
          content: topic.content.trim(),
          quiz: topic.quiz,
          createdAt: new Date()
        });
      });
    });

    console.log(`\nSeeding Tracks (${tracksList.length})...`);
    await db.collection("tracks").deleteMany({});
    const trackResult = await db.collection("tracks").insertMany(tracksList);
    console.log(`✓ Inserted ${trackResult.insertedCount} tracks.`);

    console.log(`\nSeeding Topics (${topicsList.length})...`);
    await db.collection("topics").deleteMany({});
    const topicResult = await db.collection("topics").insertMany(topicsList);
    console.log(`✓ Inserted ${topicResult.insertedCount} topics.`);

    // 2. Seed Final Exam Questions
    const examQuestions = window.HTMLMaster.data.EXAM.map((q, idx) => ({
      questionId: `ex_${idx + 1}`,
      question: q.q,
      options: q.options,
      correctAnswerIndex: q.answer,
      createdAt: new Date()
    }));

    console.log(`\nSeeding Final Exam Questions (${examQuestions.length})...`);
    await db.collection("exam_questions").deleteMany({});
    const examResult = await db.collection("exam_questions").insertMany(examQuestions);
    console.log(`✓ Inserted ${examResult.insertedCount} exam questions.`);

    // 3. Seed Cheatsheet
    const cheatsheetTags = window.HTMLMaster.data.CHEATSHEET.map((item, idx) => ({
      id: `tag_${idx + 1}`,
      tag: item.tag,
      category: item.category,
      desc: item.desc,
      example: item.example,
      isVoid: item.void,
      createdAt: new Date()
    }));

    console.log(`\nSeeding Cheatsheet Tags (${cheatsheetTags.length})...`);
    await db.collection("cheatsheet").deleteMany({});
    const cheatResult = await db.collection("cheatsheet").insertMany(cheatsheetTags);
    console.log(`✓ Inserted ${cheatResult.insertedCount} cheatsheet tags.`);

    // 4. Seed Coding Challenges
    const challengesList = window.HTMLMaster.data.CHALLENGES.map((ch, idx) => ({
      challengeId: ch.id,
      order: idx + 1,
      title: ch.title,
      difficulty: ch.difficulty,
      description: ch.description,
      starterCode: ch.starterCode,
      testsCount: ch.tests.length,
      testDescriptions: ch.tests.map(t => t.desc),
      createdAt: new Date()
    }));

    console.log(`\nSeeding Coding Challenges (${challengesList.length})...`);
    await db.collection("challenges").deleteMany({});
    const chResult = await db.collection("challenges").insertMany(challengesList);
    console.log(`✓ Inserted ${chResult.insertedCount} coding challenges.`);

    // 5. Seed Achievements
    const achievementsList = window.HTMLMaster.data.ACHIEVEMENTS.map(ach => ({
      achievementId: ach.id,
      title: ach.title,
      desc: ach.desc,
      icon: ach.icon,
      createdAt: new Date()
    }));

    console.log(`\nSeeding Achievements (${achievementsList.length})...`);
    await db.collection("achievements").deleteMany({});
    const achResult = await db.collection("achievements").insertMany(achievementsList);
    console.log(`✓ Inserted ${achResult.insertedCount} achievements.`);

    // 6. Seed Arcade Games & Questions
    const arcadeGamesList = [
      {
        gameId: "memory",
        title: "HTML Tag Memory Matcher",
        category: "Memory Flip",
        description: "Pair HTML tags with their core semantic functionality.",
        pairsCount: 6,
        createdAt: new Date()
      },
      {
        gameId: "snake",
        title: "HTML5 Canvas Cyber Snake",
        category: "2D Canvas Arcade",
        description: "Control snake on 2D canvas collecting HTML tags with Relaxed, Normal and Swift speeds.",
        speedsSupported: ["slow", "normal", "fast"],
        defaultSpeed: "slow",
        createdAt: new Date()
      },
      {
        gameId: "wordmap",
        title: "Tag Word Mapper",
        category: "Word Mapping",
        description: "Connect HTML tags to their English word definitions across 4 structured levels.",
        roundsCount: 4,
        pairsPerRound: 6,
        createdAt: new Date()
      },
      {
        gameId: "chooseall",
        title: "Choose ALL Tag Blitz Quiz",
        category: "Multi-Select Quiz",
        description: "8 multi-select questions testing void elements, semantic layout, tables, forms, and accessibility.",
        questionsCount: 8,
        createdAt: new Date()
      }
    ];

    console.log(`\nSeeding Arcade Games (${arcadeGamesList.length})...`);
    await db.collection("arcade_games").deleteMany({});
    const arcadeResult = await db.collection("arcade_games").insertMany(arcadeGamesList);
    console.log(`✓ Inserted ${arcadeResult.insertedCount} arcade games.`);

    // 7. Metadata Record
    await db.collection("system_metadata").deleteMany({});
    await db.collection("system_metadata").insertOne({
      platform: "HTML Master LMS",
      version: "2.6.0",
      seededAt: new Date(),
      totalTracks: tracksList.length,
      totalTopics: topicsList.length,
      totalExamQuestions: examQuestions.length,
      totalCheatsheetTags: cheatsheetTags.length,
      totalChallenges: challengesList.length,
      totalAchievements: achievementsList.length,
      totalArcadeGames: arcadeGamesList.length,
      status: "ACTIVE"
    });

    console.log("\n==============================================");
    console.log("🎉 ALL SEEDS & DATA SUCCESSFULLY SAVED TO MONGODB ATLAS!");
    console.log(`Database: ${DB_NAME}`);
    console.log("Collections created and populated:");
    console.log(`  • tracks: ${trackResult.insertedCount} documents`);
    console.log(`  • topics: ${topicResult.insertedCount} documents`);
    console.log(`  • exam_questions: ${examResult.insertedCount} documents`);
    console.log(`  • cheatsheet: ${cheatResult.insertedCount} documents`);
    console.log(`  • challenges: ${chResult.insertedCount} documents`);
    console.log(`  • achievements: ${achResult.insertedCount} documents`);
    console.log(`  • arcade_games: ${arcadeResult.insertedCount} documents`);
    console.log(`  • system_metadata: 1 document`);
    console.log("==============================================");

  } catch (err) {
    console.error("Error during MongoDB seeding:", err);
    process.exitCode = 1;
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

seedDatabase();
