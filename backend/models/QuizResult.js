const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answers: [{
        questionIndex: Number,
        selectedOption: Number,
        isCorrect: Boolean
    }],
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    timeTaken: {
        type: Number, // in seconds
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QuizResult', quizResultSchema); 