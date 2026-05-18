const express = require("express");
const Router = express.Router();
const Tasks = require("../Models/TasksSchema");

// Create tasks
Router.post("/", (req, res) => {
    const { employee, Title, Descriptions, StartDate, EndDate } = req.body;
    const TasksData = { employee, Title, Descriptions, StartDate, EndDate };
    const NewTasks = new Tasks(TasksData);

    NewTasks.save()
        .then(() => {
            res.status(200).json({ message: "Task Created" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error creating task" });
        });
});

// Get all tasks
Router.get("/", (req, res) => {
    Tasks.find()
        .then((tasks) => {
            res.status(200).json(tasks);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// Get tasks by employee ID
Router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const taskData = await Tasks.find({ employee: id });

        if (taskData.length > 0) {
            res.status(200).json(taskData);
        } else {
            res.status(404).json({ message: 'No tasks found for this employee' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete the unique task
Router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Tasks.findByIdAndDelete(id);
        res.status(200).json({ message: "Task Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting task" });
    }
});

// Mark task as completed
Router.put('/:id/complete', async (req, res) => {
    const { id } = req.params;

    try {
        await Tasks.findByIdAndUpdate(id, { completed: true }, { new: true });
        res.status(200).json({ message: "Task marked as completed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error completing task" });
    }
});

// Update the unique task
Router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Tasks.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Task Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating task" });
    }
});

module.exports = Router;