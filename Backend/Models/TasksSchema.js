const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employeees',
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Descriptions: {
        type: String
    },
    StartDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },

    completed_date: {
        type: Date
    },
    
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Tasks", TasksSchema);
