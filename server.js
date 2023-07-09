const express = require('express');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const subTasksRoutes = require('./routes/subTasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/users', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/sub', subTasksRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
















