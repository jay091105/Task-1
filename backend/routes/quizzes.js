const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');

// Create a new quiz
router.post('/', auth, async (req, res) => {
    try {
        const quiz = new Quiz({
            ...req.body,
            creator: req.user._id
        });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz' });
    }
});

// Get all public quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find({ isPublic: true })
            .populate('creator', 'username')
            .select('-questions.correctAnswer');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes' });
    }
});

// Get user's created quizzes
router.get('/my-quizzes', auth, async (req, res) => {
    try {
        const quizzes = await Quiz.find({ creator: req.user._id });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes' });
    }
});

// Get a specific quiz
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate('creator', 'username');
        
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // If not the creator, remove correct answers
        if (!req.user || quiz.creator._id.toString() !== req.user._id.toString()) {
            quiz.questions = quiz.questions.map(q => ({
                ...q.toObject(),
                correctAnswer: undefined
            }));
        }

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz' });
    }
});

// Submit quiz answers
router.post('/:id/submit', auth, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const { answers, timeTaken } = req.body;
        let score = 0;

        // Calculate score
        answers.forEach((answer, index) => {
            if (quiz.questions[index].correctAnswer === answer.selectedOption) {
                score++;
            }
        });

        // Create quiz result
        const result = new QuizResult({
            quiz: quiz._id,
            user: req.user._id,
            answers,
            score,
            totalQuestions: quiz.questions.length,
            timeTaken
        });

        await result.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quiz' });
    }
});

// Update quiz
router.put('/:id', auth, async (req, res) => {
    try {
        const quiz = await Quiz.findOne({
            _id: req.params.id,
            creator: req.user._id
        });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        Object.assign(quiz, req.body);
        await quiz.save();
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error updating quiz' });
    }
});

// Delete quiz
router.delete('/:id', auth, async (req, res) => {
    try {
        const quiz = await Quiz.findOneAndDelete({
            _id: req.params.id,
            creator: req.user._id
        });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz' });
    }
});

module.exports = router; 