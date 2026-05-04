const Task = require('../models/taskModel');

exports.createTask = (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ message: "Title required" });
    }
    res.status(201).json(Task.create(req.body));
};

exports.getTasks = (req, res) => {
    let tasks = Task.getAll();

    // FILTER
    if (req.query.status) {
        tasks = tasks.filter(t => t.status === req.query.status);
    }

    // SEARCH
    if (req.query.search) {
        const s = req.query.search.toLowerCase();
        tasks = tasks.filter(t =>
            t.title.toLowerCase().includes(s) ||
            t.description.toLowerCase().includes(s)
        );
    }

    res.json(tasks);
};

exports.getTask = (req, res) => {
    const task = Task.getById(parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
};

exports.updateTask = (req, res) => {
    const task = Task.update(parseInt(req.params.id), req.body);
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
};

exports.deleteTask = (req, res) => {
    const ok = Task.remove(parseInt(req.params.id));
    if (!ok) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
};