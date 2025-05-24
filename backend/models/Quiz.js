const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: Number
    },
    correctAnswers: [{
        type: Number
    }],
    type: {
        type: String,
        enum: ['single', 'multiple'],
        default: 'single'
    }
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [questionSchema],
    timeLimit: {
        type: Number, // in minutes
        default: 0
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quiz', quizSchema); 