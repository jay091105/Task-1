const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    answers: [{
        questionIndex: Number,
        selectedOption: mongoose.Schema.Types.Mixed,  // Can be number or array of numbers
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
        type: Number,  // in seconds
        required: true
    },
    achievementsEarned: [{
        type: String,
        enum: ['quiz_master', 'perfect_score', 'speed_demon', 'streak_master']
    }]
}, {
    timestamps: true
});

// Calculate percentage score
quizResultSchema.virtual('percentage').get(function() {
    return (this.score / this.totalQuestions) * 100;
});

// Check if it's a perfect score
quizResultSchema.virtual('isPerfect').get(function() {
    return this.score === this.totalQuestions;
});

// Check if it's a passing score (>= 80%)
quizResultSchema.virtual('isPassing').get(function() {
    return this.percentage >= 80;
});

module.exports = mongoose.model('QuizResult', quizResultSchema); 