const express = require('express');
const { pool } = require('../db');
const router = express.Router();
const VerifyToken = require('../middlewares/VerifyToken');

router.get('/all', async(req,res) => {
    try{
        const query = 'SELECT * FROM tasks';
        const {rows} = await pool.query(query);
        res.json(rows);
    }catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({error: 'An error occurred'});
    }
});

router.get('/all/:user_id',   VerifyToken, async(req, res) => {
    try{
        console.log('running after VerifyToken')
        const {user_id} = req.params;
        const query = 'SELECT * FROM tasks WHERE user_id = $1';
        const {rows} = await pool.query(query, [user_id]);
        res.json(rows);
    }catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get('/search/:task_name', async(req, res) => {
    try{
        const {task_name} = req.params;
        const query = 'SELECT * FROM tasks WHERE task_name ILIKE $1';
        const {rows} = await pool.query(query, [`%${task_name}%`]);
        res.json(rows);
    }catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/create', async (req, res) => {
    try{
        const {task_name, task_description,  user_id, due_date} = req.body;
        const query = `
            INSERT INTO tasks (user_id, task_name, task_description,  due_date)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [user_id, task_name, task_description,  due_date];
        const {rows} = await pool.query(query, values);
        res.json(rows);
    }catch(error){
        console.error('Error creating task:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const taskId = req.params.id;
        const query = 'DELETE FROM tasks WHERE  id = $1';
        const {rowCount} = await pool.query(query, [taskId]);
        if(rowCount === 0 ){
            return res.status(404).json({error: 'Task not found'});
        }
        res.json({message: 'Task deleted successfully'});
    }catch(error){
        console.error('Error deleting task:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
});

router.put('/update/:id', async (req, res) => {
    try{
        const task_id = req.params.id;
        const {task_name, task_description} = req.body;
        const query = `
            UPDATE tasks
            SET
                task_name = COALESCE($1, task_name),
                task_description = COALESCE($2, task_description),
                time_updated = NOW() 
            WHERE id = $3
            RETURNING *
        `
        const values = [task_name, task_description, task_id];
        const {rows} = await pool.query(query, values);
        res.json(rows);
    }catch(error){
        console.error('Error updating task:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
});

router.put('/complete/:id', async(req, res) => {
    try{
        const task_id = req.params.id;
        const query = `
            UPDATE tasks
            SET
                is_complete = true,
                time_completed =NOW()
            WHERE id = $1
            RETURNING *
        `;
        const {rows} = await pool.query(query, [task_id]);
        res.json(rows);
    }catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ error: 'An error occurred', message: error.message });
    }
});

module.exports = router;
