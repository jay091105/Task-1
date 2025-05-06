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

module.exports = router; 