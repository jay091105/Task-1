const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');

// Get user statistics and achievements
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all quiz results for the user
    const quizResults = await QuizResult.find({ user: userId })
      .populate('quiz')
      .sort({ createdAt: -1 });

    // Calculate statistics
    const stats = {
      totalQuizzesTaken: quizResults.length,
      totalCorrectAnswers: quizResults.reduce((sum, result) => sum + result.score, 0),
      averageScore: 0,
      quizzesPassed: 0,
      perfectScores: 0,
      fastestCompletion: null,
      streakCount: 0
    };

    // Calculate average score
    if (stats.totalQuizzesTaken > 0) {
      stats.averageScore = (stats.totalCorrectAnswers / (stats.totalQuizzesTaken * 100)) * 100;
    }

    // Count quizzes passed (>= 80%)
    stats.quizzesPassed = quizResults.filter(result => 
      (result.score / result.totalQuestions) * 100 >= 80
    ).length;

    // Count perfect scores
    stats.perfectScores = quizResults.filter(result => 
      result.score === result.totalQuestions
    ).length;

    // Find fastest completion time
    if (quizResults.length > 0) {
      stats.fastestCompletion = Math.min(...quizResults.map(result => result.timeTaken));
    }

    // Calculate streak
    let currentStreak = 0;
    let lastQuizDate = null;
    
    for (const result of quizResults) {
      const quizDate = new Date(result.createdAt).toDateString();
      
      if (!lastQuizDate) {
        currentStreak = 1;
      } else {
        const dayDiff = Math.floor(
          (new Date(lastQuizDate) - new Date(quizDate)) / (1000 * 60 * 60 * 24)
        );
        
        if (dayDiff === 1) {
          currentStreak++;
        } else if (dayDiff > 1) {
          break;
        }
      }
      
      lastQuizDate = quizDate;
    }
    
    stats.streakCount = currentStreak;

    // Return the statistics
    res.json(stats);
  } catch (err) {
    console.error('Error fetching user stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 