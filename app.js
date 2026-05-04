const express = require('express');
const app = express();

const path = require('path');
const taskRoutes = require('./routes/tasks');

app.use(express.json());

app.use('/tasks', taskRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Server running..-----");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});