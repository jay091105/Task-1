const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const QuizResult = require('../models/QuizResult');
const Quiz = require('../models/Quiz');

// Get user's quiz results
router.get('/my-results', auth, async (req, res) => {
    try {
        const results = await QuizResult.find({ user: req.user._id })
            .populate('quiz', 'title')
            .sort({ completedAt: -1 });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results' });
    }
});

// Get results for a specific quiz (only for quiz creator)
router.get('/quiz/:quizId', auth, async (req, res) => {
    try {
        const quiz = await Quiz.findOne({
            _id: req.params.quizId,
            creator: req.user._id
        });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const results = await QuizResult.find({ quiz: req.params.quizId })
            .populate('user', 'username')
            .sort({ completedAt: -1 });
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results' });
    }
});

// Get detailed result for a specific attempt
router.get('/:id', auth, async (req, res) => {
    try {
        const result = await QuizResult.findById(req.params.id)
            .populate('quiz')
            .populate('user', 'username');

        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        // Only allow access to the user who took the quiz or the quiz creator
        if (result.user._id.toString() !== req.user._id.toString() &&
            result.quiz.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching result' });
    }
});

// Get user's quiz statistics
router.get('/user-stats', auth, async (req, res) => {
    try {
        // Get all results for the user
        const results = await QuizResult.find({ user: req.user._id })
            .populate('quiz', 'title')
            .sort({ createdAt: -1 });

        // Calculate statistics
        const totalQuizzes = results.length;
        const totalScore = results.reduce((sum, result) => sum + (result.score / result.totalQuestions * 100), 0);
        const averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
        const highestScore = totalQuizzes > 0 ? Math.round(Math.max(...results.map(r => (r.score / r.totalQuestions * 100)))) : 0;
        const totalTimeSpent = results.reduce((sum, result) => sum + (result.timeTaken || 0), 0);

        // Get recent performance (last 5 quizzes)
        const recentPerformance = results.slice(0, 5).map(result => ({
            title: result.quiz.title,
            score: Math.round((result.score / result.totalQuestions) * 100),
            timeTaken: result.timeTaken
        }));

        res.json({
            totalQuizzes,
            averageScore,
            highestScore,
            totalTimeSpent,
            recentPerformance
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ message: 'Error fetching user statistics' });
    }
});

module.exports = router; 